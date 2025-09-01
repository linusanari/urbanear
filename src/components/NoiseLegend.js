// src/components/NoiseLegend.js
import React from 'react';
import '../styles.css';

const NoiseLegend = () => (
  <div className="map-legend right">
    <h4>Noise Levels (dB)</h4>
    <div className="legend-scale">
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#1a9850' }}></span>
        Safe (&lt;40 dB)
      </div>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#91cf60' }}></span>
        Acceptable (40–55 dB)
      </div>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#fee08b' }}></span>
        Annoying (55–65 dB)
      </div>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#fc8d59' }}></span>
        Harmful (65–75 dB)
      </div>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#d73027' }}></span>
        Very Harmful (&gt;75 dB)
      </div>
    </div>
  </div>
);

export default NoiseLegend;
