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
       40, '#31688E',
       60, '#35B779',
       80, '#FDE724',
       100, '#FF0000'
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff'
  }
};

export default function NoisePointsLayerComponent() {
  return <Layer {...NoisePointsLayer} />;
}
