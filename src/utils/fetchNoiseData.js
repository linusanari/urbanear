// utils/fetchNoiseData.js
import supabase from '../api/supabaseClient';
import { convertToGeoJSON } from './convertToGeoJSON';

export const fetchNoiseData = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    console.warn("fetchNoiseData: missing startDate or endDate—returning empty GeoJSON.");
    return { type: "FeatureCollection", features: [] };
  }

  console.log("fetchNoiseData: querying Supabase from", startDate, "to", endDate);

  const { data: rows, error } = await supabase
    .from('urbanear')
    .select('id, datecol, instantaneous, average, minimum, maximum, latitude, longitude, androidid, sync')
    .gte('datecol', startDate)
    .lte('datecol', endDate);

  if (error) {
    // Print the entire error object with all its properties:
    console.error("fetchNoiseData: Supabase returned an error object →");
    console.error(JSON.stringify(error, null, 2));
    // Optionally inspect piece by piece:
    console.error("  ● error.code:", error.code);
    console.error("  ● error.details:", error.details);
    console.error("  ● error.hint:", error.hint);
    console.error("  ● error.message:", error.message);

    // Return an empty GeoJSON so the map code doesn’t crash
    return { type: "FeatureCollection", features: [] };
  }

  if (!rows || rows.length === 0) {
    console.warn(`fetchNoiseData: no rows found between ${startDate} and ${endDate}`);
    return { type: "FeatureCollection", features: [] };
  }

  const geoJson = convertToGeoJSON(rows);
  console.log("fetchNoiseData: converted rows to GeoJSON (features length = " + geoJson.features.length + ")");
  return geoJson;
};
