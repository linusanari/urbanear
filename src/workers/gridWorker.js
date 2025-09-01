// gridWorker.js
/* eslint-disable no-restricted-globals */
import * as turf from '@turf/turf';

self.onmessage = (e) => {
  const { noiseData, bbox, cellSizeKm } = e.data;

  if (!noiseData || !bbox) {
    self.postMessage({ type: 'done', grid: null });
    return;
  }

  const grid = turf.squareGrid(bbox, cellSizeKm, { units: 'kilometers' });
  const enrichedFeatures = [];
  const total = grid.features.length;

  grid.features.forEach((cell, i) => {
    const pointsInCell = turf.pointsWithinPolygon(noiseData, cell);
    const values = pointsInCell.features
      .map((pt) => {
        const val = pt.properties.instantaneous ?? pt.properties.noise_level;
        return val ? parseFloat(val) : null;
      })
      .filter((v) => v !== null && !isNaN(v));

    const meanNoise =
      values.length > 0
        ? values.reduce((sum, v) => sum + v, 0) / values.length
        : null;

    enrichedFeatures.push({
      type: 'Feature',
      geometry: cell.geometry,
      properties: { mean_noise: meanNoise },
    });

    // Progress update every 50 cells
    if (i % 50 === 0) {
      self.postMessage({
        type: 'progress',
        progress: Math.round((i / total) * 100),
      });
    }
  });

  self.postMessage({
    type: 'done',
    grid: { type: 'FeatureCollection', features: enrichedFeatures },
  });
};
