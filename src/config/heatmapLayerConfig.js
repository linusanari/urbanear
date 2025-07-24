// config/heatmapLayerConfig.js
const heatmapLayerConfig = {
    id: 'noise-heatmap',
    type: 'heatmap',
    source: 'noise-data',
    maxzoom: 20,
    paint: {
      // weight is based on the 'noise_level' property in each Feature
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'noise_level'],
        0, 0,
        100, 1
      ],
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 1,
        15, 3
      ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(255, 255, 255, 0)',
        0.2, '#440154',
        0.4, '#31688E',
        0.6, '#35B779',
        0.8, '#FDE724',
        1, '#FF0000'
      ],
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 2,
        15, 25
      ],
      'heatmap-opacity': 0.7,
    }
  };
  
  export default heatmapLayerConfig;
  
