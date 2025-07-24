// components/TimeFilterPanel.js
import React from 'react';

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const getISODateString = (date) => date.toISOString().split('T')[0];

const TimeFilterPanel = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const setPreset = (daysAgo) => {
    const now = new Date();
    setStartDate(getISODateString(addDays(now, -daysAgo)));
    setEndDate(getISODateString(now));
  };

  return (
    <div className="time-filter-panel">
      <label className="filter-label">Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-picker"
      />

      <label className="filter-label">End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-picker"
      />

      <div className="preset-buttons">
        <button type="button" onClick={() => setPreset(1)}>Last 24 Hours</button>
        <button type="button" onClick={() => setPreset(7)}>Last 7 Days</button>
        <button
          type="button"
          onClick={() => {
            setStartDate('2000-01-01');
            setEndDate(getISODateString(new Date()));
          }}
        >
          Show All Time
        </button>
      </div>
    </div>
  );
};

export default TimeFilterPanel;
