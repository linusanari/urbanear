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
            '#d9d9d9',
            55, '#ffffb2',
            65, '#fecc5c',
            75, '#fd8d3c',
            85, '#f03b20',
            95, '#bd0026'
          ],
          'fill-opacity': 0.6,
          'fill-outline-color': '#333'
        }}
      />
    </Source>
  );
};

export default NoiseGridLayer;
