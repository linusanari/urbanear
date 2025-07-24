// components/LULCLayer.js
import React, { useEffect, useState, useCallback } from 'react';
import { Source, Layer, Popup, useMap } from 'react-map-gl';

// ----------------------------------------
// Step 1: Define color scheme per land use
// ----------------------------------------
// Ideally, update these colors to reflect whether each land use type is within
// acceptable noise threshold ranges (you can update them later once you have the data)
const landUseColors = {
  commercial: '#e41a1c',        // High noise tolerance
  industrial: '#e41a1c',        // High noise tolerance (same red as commercial)
  institutional: '#377eb8',     // Moderate noise tolerance
  'mixed CL': '#377eb8',        // Moderate noise tolerance
  'mixed RC': '#377eb8',        // Moderate noise tolerance
  residential: '#4daf4a',       // Low noise tolerance (green)
  res_slum: '#4daf4a',          // Low noise tolerance
  recreational: '#4daf4a',      // Low noise tolerance
  open_space: '#4daf4a',        // Low noise tolerance
  'open space': '#4daf4a',      // In case of naming inconsistency
  no_structures: '#999999',     // Neutral
  transportation: '#999999',    // Neutral
  unknown: '#cccccc',           // Unknown land use
  water: '#a6d854'              // Not applicable but kept visible
};

// ----------------------------------------
// Step 2: Define Mapbox fill layer styling
// ----------------------------------------
const lulcLayer = {
  id: 'lulc-polygons',
  type: 'fill',
  paint: {
    // Match land use field with a color
    'fill-color': [
      'match',
      ['get', 'LANDUSE'],
      ...Object.entries(landUseColors).flat(),
      '#ccc' // fallback color if land use class is not in the list
    ],
    'fill-opacity': 0.4,
    'fill-outline-color': '#444'
  }
};

// ----------------------------------------
// Step 3: React Component
// ----------------------------------------
export default function LULCLayer({ visible }) {
  const [lulcData, setLulcData] = useState(null);    // Stores the GeoJSON for land use
  const [hoverInfo, setHoverInfo] = useState(null);  // Info for popups
  const { current: map } = useMap();                 // Access current map instance

  // Load land use data when component is visible
  useEffect(() => {
    if (!visible) return;

    fetch('/data/land_use.geojson')
      .then((res) => res.json())
      .then((data) => setLulcData(data));
  }, [visible]);

  // Mouse hover logic
  const onMouseMove = useCallback((event) => {
    const feature = event.features?.[0];
    if (feature && feature.properties?.LANDUSE) {
      setHoverInfo({
        lngLat: event.lngLat,
        landuse: feature.properties.LANDUSE
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  // Add hover event listeners to map
  useEffect(() => {
    if (!map || !visible) return;

    map.on('mousemove', 'lulc-polygons', onMouseMove);
    map.on('mouseleave', 'lulc-polygons', () => setHoverInfo(null));

    return () => {
      map.off('mousemove', 'lulc-polygons', onMouseMove);
      map.off('mouseleave', 'lulc-polygons', () => setHoverInfo(null));
    };
  }, [map, visible, onMouseMove]);

  // Don’t render if data isn’t ready or layer isn’t visible
  if (!visible || !lulcData) return null;

  // ----------------------------------------
  // Step 4: Return the Map layer and optional popup
  // ----------------------------------------
  return (
    <>
      <Source id="lulc" type="geojson" data={lulcData}>
        <Layer {...lulcLayer} />
      </Source>

      {hoverInfo && (
        <Popup
          longitude={hoverInfo.lngLat.lng}
          latitude={hoverInfo.lngLat.lat}
          closeButton={false}
        >
          <div><strong>Land Use:</strong> {hoverInfo.landuse}</div>
        </Popup>
      )}
    </>
  );
}
