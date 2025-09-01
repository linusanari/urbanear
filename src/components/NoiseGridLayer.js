import React from 'react';
import { Source, Layer } from 'react-map-gl';

const NoiseGridLayer = ({ gridData }) => {
  if (!gridData) return null;

  return (
    <Source id="noise-grid" type="geojson" data={gridData}>
      <Layer
        id="noise-grid-layer"
        type="fill"
        paint={{
          'fill-color': [
            'step',
            ['get', 'mean_noise'],
            '#1a9850',   // <40 dB - Safe
            40, '#91cf60', // 40–54 dB - Low
            55, '#fee08b', // 55–64 dB - Moderate
            65, '#fc8d59', // 65–74 dB - High
            75, '#d73027'  // ≥75 dB - Very high
          ],
          'fill-opacity': 0.6,
          'fill-outline-color': '#333'
        }}
      />
    </Source>
  );
};

export default NoiseGridLayer;
