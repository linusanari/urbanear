// components/NoiseDataLoader.js
import { useEffect } from 'react';
import { fetchNoiseData } from '../utils/fetchNoiseData';

const NoiseDataLoader = ({ startDate, endDate, setFilteredData, setLoading }) => {
  useEffect(() => {
    const fetchAndPass = async () => {
      setLoading(true);
      try {
        const geoJson = await fetchNoiseData(startDate, endDate);

        // Inspect the GeoJSON structure in detail:
        // console.log("NoiseDataLoader: full GeoJSON object →");
        // console.log(JSON.stringify(geoJson, null, 2));

        // Check how many features:
        if (geoJson.features) {
          console.log("NoiseDataLoader: number of features =", geoJson.features.length);
        } else {
          console.warn("NoiseDataLoader: geoJson.features is undefined!");
        }

        setFilteredData(geoJson);
      } catch (err) {
        console.error("NoiseDataLoader: unexpected error:", err);
        setFilteredData({ type: "FeatureCollection", features: [] });
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchAndPass();
    }
  }, [startDate, endDate, setFilteredData, setLoading]);

  return null;
};

export default NoiseDataLoader;
