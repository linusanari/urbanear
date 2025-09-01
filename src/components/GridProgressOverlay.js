// components/GridProgressOverlay.js
import React from 'react';
import '../styles.css';

const GridProgressOverlay = ({ progress }) => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Computing averages for the grids...</p>

      {progress !== null && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {progress !== null && <p>{progress}%</p>}
    </div>
  );
};

export default GridProgressOverlay;
