// components/NoisePointsLayer.js
import React from 'react';
import { Layer } from 'react-map-gl';

const NoisePointsLayer = {
  id: 'noise-points',
  type: 'circle',
  source: 'noise-data',
  paint: {
    'circle-radius': 5,
    'circle-color': [
      'interpolate',
      ['linear'],
      ['get', 'instantaneous'],
       40, '#1a9850',
       55, '#91cf60',
       65, '#fee08b',
       75, '#fc8d59',
       100, '#d73027'
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff'
  }
};

export default function NoisePointsLayerComponent() {
  return <Layer {...NoisePointsLayer} />;
}
