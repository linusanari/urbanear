export const parseAndConvertGeoData = (data) => {
    return {
        type: 'FeatureCollection',
        features: data.map((record) => {
            const geometry = JSON.parse(record.geometry.replace(/'/g, '"'));  // Fix quotes if needed
            let coordinates;

            if (geometry.type === 'Point') {
                coordinates = geometry.coordinates;
            } else if (geometry.type === 'Polygon') {
                coordinates = calculatePolygonCentroid(geometry.coordinates[0]);
            }

            if (!coordinates) return null;

            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                properties: {
                    noise_level: record.instantaneous,
                    country: record.country,     // Optionally keep
                    region: record.region        // Optionally keep
                }
            };
        }).filter(feature => feature !== null)  // Remove any invalid entries
    };
};

const calculatePolygonCentroid = (coordinates) => {
    let x = 0, y = 0, area = 0;

    for (let i = 0; i < coordinates.length - 1; i++) {
        const [x1, y1] = coordinates[i];
        const [x2, y2] = coordinates[i + 1];

        const a = x1 * y2 - x2 * y1;
        area += a;
        x += (x1 + x2) * a;
        y += (y1 + y2) * a;
    }

    area *= 0.5;
    x /= (6 * area);
    y /= (6 * area);

    return [x, y];
};
