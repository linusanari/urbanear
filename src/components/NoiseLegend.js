// src/components/NoiseLegend.js
import React from 'react';
import '../styles.css';

const NoiseLegend = () => (
  <div className="map-legend right">
    <h4>Noise Levels (dB)</h4>
    <div className="legend-scale">
      <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#440154' }}></span> Very Low (&lt;40dB)</div>
      <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#31688E' }}></span> Low (40–60dB)</div>
      <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#35B779' }}></span> Moderate (60–80dB)</div>
      <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#FDE724' }}></span> High (80–100dB)</div>
      <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#FF0000' }}></span> Very High (&gt;100dB)</div>
    </div>
  </div>
);

export default NoiseLegend;
