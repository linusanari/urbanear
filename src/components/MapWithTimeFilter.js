import React, { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapLegend from './MapLegend';
import heatmapLayerConfig from '../config/heatmapLayerConfig';
import TimeFilterPanel from './TimeFilterPanel';
import NoiseDataWithTimeFilter from './NoiseDataLoader';
import LoadingOverlay from './LoadingOverlay'; // Add loading overlay
import '../styles/styles.css';

const MapWithTimeFilter = () => {
    const [viewport, setViewport] = useState({
        latitude: 1.2921,
        longitude: 36.8219,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
    });

    const [filteredData, setFilteredData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);  // State for loading

    return (
        <div className="map-container">
            {loading && <LoadingOverlay />} {/* Show loading animation when loading */}

            <Map
                {...viewport}
                width="100%"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onMove={evt => setViewport(evt.viewState)}
            >
                {filteredData && (
                    <Source id="noise-data" type="geojson" data={filteredData}>
                        <Layer {...heatmapLayerConfig} />
                    </Source>
                )}
                <MapLegend />
            </Map>

            <TimeFilterPanel
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            <NoiseDataWithTimeFilter
                startDate={startDate}
                endDate={endDate}
                setFilteredData={setFilteredData}
                setLoading={setLoading} // Pass loading handler
            />
        </div>
    );
};

export default MapWithTimeFilter;
