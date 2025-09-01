// components/MapContainer.js
import React, { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Custom hook for grid worker
import useNoiseGridWorker from '../hooks/useNoiseGridWorker';

// Components
import NoiseGridLayer from './NoiseGridLayer';
import NoiseLegend from './NoiseLegend';
import LULCLegend from './LULCLegend';
import TimeFilterPanel from './TimeFilterPanel';
import NoiseDataLoader from './NoiseDataLoader';
import LoadingOverlay from './LoadingOverlay';
import NoisePointsLayerComponent from './NoisePointsLayer';
import NoisePopup from './NoisePopup';
import LayerToggle from './LayerToggle';
import LULCLayer from './LULCLayer';
import GridProgressOverlay from './GridProgressOverlay';

// Config
import heatmapLayerConfig from '../config/heatmapLayerConfig';

import '../styles.css';

const MapContainer = () => {
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    latitude: 1.2921,
    longitude: 36.8219,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  // Data
  const [filteredData, setFilteredData] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Toggles
  const [showPoints, setShowPoints] = useState(false);
  const [showLULC, setShowLULC] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Viewport bbox
  const [viewportBbox, setViewportBbox] = useState(null);

  // Grid computation via worker hook
  const { gridData, progress, computing } = useNoiseGridWorker(
    filteredData,
    viewportBbox,
    viewport.zoom
  );

  // Zoom bump when grid enabled
  useEffect(() => {
    if (showGrid) {
      setViewport((prev) => ({
        ...prev,
        zoom: Math.max(prev.zoom, 13),
        transitionDuration: 1000
      }));
    }
  }, [showGrid]);

  // Update bbox
  const handleMove = (evt) => {
    setViewport(evt.viewState);
    try {
      const map = mapRef.current?.getMap?.();
      if (map) {
        const bounds = map.getBounds().toArray();
        setViewportBbox([bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]]);
      }
    } catch (err) {
      console.warn("Failed to update viewportBbox:", err);
    }
  };

  return (
    <div className="map-container">
      {loading && <LoadingOverlay />}
      {showGrid && computing && <GridProgressOverlay progress={progress} />}

      <Map
        ref={mapRef}
        initialViewState={viewport}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={handleMove}
      >
        {showLULC && <LULCLayer visible={showLULC} />}

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

        {showGrid && gridData && <NoiseGridLayer gridData={gridData} />}

        {showPoints && <NoiseLegend />}
        {showLULC && <LULCLegend />}
        {showGrid && <NoiseLegend />}
      </Map>

      {showGrid && viewport.zoom < 12 && (
        <div className="map-overlay notice">
          <p>Zoom in to see the noise grid.</p>
        </div>
      )}

      <LayerToggle
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showPoints={showPoints}
        setShowPoints={setShowPoints}
        showLULC={showLULC}
        setShowLULC={setShowLULC}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
      />

      <TimeFilterPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

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
