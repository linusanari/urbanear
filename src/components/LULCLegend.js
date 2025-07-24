import React from 'react';
import '../styles.css';

// Grouped by noise thresholds
const lulcLegendItems = {
  // ≤ 35 dB
  institutional: { color: '#4daf4a', threshold: '≤35 dB' },
  res_slum: { color: '#4daf4a', threshold: '≤35 dB' },
  recreational: { color: '#4daf4a', threshold: '≤35 dB' },

  // ≤ 50 dB
  residential: { color: '#fc8d62', threshold: '≤50 dB' },
  open_space: { color: '#fc8d62', threshold: '≤50 dB' },
  'open space': { color: '#fc8d62', threshold: '≤50 dB' },
  no_structures: { color: '#fc8d62', threshold: '≤50 dB' },

  // ≤ 60 dB
  commercial: { color: '#e41a1c', threshold: '≤60 dB' },
  transportation: { color: '#e41a1c', threshold: '≤60 dB' },
  'mixed RC': { color: '#e41a1c', threshold: '≤60 dB' },
  'mixed CL': { color: '#e41a1c', threshold: '≤60 dB' },

  // ≥ 70 dB
  industrial: { color: '#377eb8', threshold: '≥70 dB' },

  // Unknown
  unknown: { color: '#999999', threshold: 'N/A' },
  water: { color: '#999999', threshold: 'N/A' },
};

const LULCLegend = () => (
  <div className="map-legend left">
    <h4>Land Use Classes (Noise Thresholds)</h4>
    <div className="legend-scale">
      {Object.entries(lulcLegendItems).map(([key, { color, threshold }]) => (
        <div key={key} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: color }}></span>
          {key} <span className="legend-threshold">({threshold})</span>
        </div>
      ))}
    </div>
  </div>
);

export default LULCLegend;
