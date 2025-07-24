// components/LayerToggle.js
import React from 'react';

export default function LayerToggle({ showPoints, setShowPoints, showLULC, setShowLULC, showChoropleth, setShowChoropleth, showHeatmap, setShowHeatmap }) {
  return (
    <div className="layer-toggle">
      {/* 
      <label>
        <input
          type="checkbox"
          checked={showChoropleth}
          onChange={() => setShowChoropleth(!showChoropleth)}
        /> Choropleth
      </label> 
      */}

      <label>
        <input
          type="checkbox"
          checked={showLULC}
          onChange={() => setShowLULC(!showLULC)}
        /> LULC Layer
      </label>
        <br/>
      <label>
        <input
          type="checkbox"
          checked={showHeatmap}
          onChange={() => setShowHeatmap(!showHeatmap)}
        /> Heatmap
      </label>

      <br/>
      <label>
        <input
          type="checkbox"
          checked={showPoints}
          onChange={() => setShowPoints(!showPoints)}
        /> Noise Points
      </label>
    </div>
  );
}
