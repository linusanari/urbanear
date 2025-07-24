// config/lulcLayerConfig.js
const lulcLayerConfig = {
    id: 'lulc-layer',
    type: 'raster',
    source: 'lulc-source',
    paint: {
      'raster-opacity': 0.6
    }
  };
  
  export const lulcSourceConfig = {
    id: 'lulc-source',
    type: 'raster',
    tiles: [
      'https://services.terrascope.be/wms/v2?SERVICE=WMS&REQUEST=GetMap&LAYERS=WORLDCOVER_2021_MAP&STYLES=&FORMAT=image/png&TRANSPARENT=true&VERSION=1.1.1&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
    ],
    tileSize: 256
  };
  
  export default lulcLayerConfig;
  