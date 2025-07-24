// utils/convertToGeoJSON.js

export const convertToGeoJSON = (dataArray) => {
    if (!Array.isArray(dataArray)) {
      console.error("convertToGeoJSON: expected an array, got:", typeof dataArray);
      return { type: "FeatureCollection", features: [] };
    }
  
    let skipped = 0;
  
    const features = dataArray
      .map((row) => {
        const lat = parseFloat(row.latitude);
        const lon = parseFloat(row.longitude);
  
        if (isNaN(lat) || isNaN(lon)) {
          skipped++;
          return null;
        }
  
        // Choose which noise field to use. 
        // Here I’ll pick 'instantaneous' (you can switch to row.average if that’s what you want).
        const noiseLevel = typeof row.instantaneous === 'number'
          ? row.instantaneous
          : parseFloat(row.instantaneous) || 0;
  
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lon, lat],
          },
          properties: {
            id: row.id ?? null,
            noise_level: noiseLevel,
            instantaneous: row.instantaneous ?? null,
            average: row.average ?? null,
            minimum: row.minimum ?? null,
            maximum: row.maximum ?? null,
            date: row.datecol ?? null,     // we’ll refer to this as 'date' or 'time_iso8601'
            androidid: row.androidid ?? null,
            sync: row.sync ?? null,
          },
        };
      })
      .filter((f) => f !== null);
  
    if (skipped > 0) {
      console.warn(`convertToGeoJSON: skipped ${skipped} rows with invalid coordinates`);
    }
  
    return {
      type: "FeatureCollection",
      features,
    };
  };
  