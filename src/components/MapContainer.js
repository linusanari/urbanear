// components/MapContainer.js
import React, { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Layer configs
import heatmapLayerConfig from '../config/heatmapLayerConfig';

// Custom components
import NoiseLegend from './NoiseLegend';
import LULCLegend from './LULCLegend';
import TimeFilterPanel from './TimeFilterPanel';
import NoiseDataLoader from './NoiseDataLoader';
import LoadingOverlay from './LoadingOverlay';
import NoisePointsLayerComponent from './NoisePointsLayer';
import NoisePopup from './NoisePopup';
import LayerToggle from './LayerToggle';
import LULCLayer from './LULCLayer';

import '../styles.css';

const MapContainer = () => {
  const [viewport, setViewport] = useState({
    latitude: 1.2921,
    longitude: 36.8219,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  // State for noise data filtered by time
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Layer toggles
  const [showPoints, setShowPoints] = useState(false);
  const [showLULC, setShowLULC] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <div className="map-container">
      {loading && <LoadingOverlay />}

      <Map
        initialViewState={viewport}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >

        {/* LULC raster layer */}
        {showLULC && <LULCLayer visible={showLULC} />}

        {/* Noise heatmap and points from Supabase */}
        {filteredData && (
          <Source id="noise-data" type="geojson" data={filteredData}>
            {showHeatmap && <Layer {...heatmapLayerConfig} />}
            {showPoints && (
              <>
                <NoisePointsLayerComponent />
                <NoisePopup data={filteredData} />
              </>
            )}
          </Source>
        )}

        {/* Legends */}
        {showPoints && <NoiseLegend />}
        {showLULC && <LULCLegend />}
      </Map>

      {/* Toggles for layers */}
      <LayerToggle
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showPoints={showPoints}
        setShowPoints={setShowPoints}
        showLULC={showLULC}
        setShowLULC={setShowLULC}
        //showChoropleth={false} // Removed choropleth toggle
        //setShowChoropleth={() => {}} // Dummy setter
      />

      {/* Time filter panel */}
      <TimeFilterPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {/* Load Supabase data */}
      <NoiseDataLoader
        startDate={startDate}
        endDate={endDate}
        setFilteredData={setFilteredData}
        setLoading={setLoading}
      />
    </div>
  );
};

export default MapContainer;
