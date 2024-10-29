import React, { useState } from 'react';
import HeatMap from 'react-heatmap-grid';

const SensorHeatmap = ({ data, labels }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);

  const xLabels = labels; // Day labels (e.g., ['Day 1', 'Day 2', ...])
  const yLabels = ['Water Levels', 'Battery Health']; // Two rows for water levels and battery health
  const heatmapData = [
    data.waterLevels, // Row 1: Water Levels
    data.batteryHealth // Row 2: Battery Health
  ];

  return (
    <div style={{ fontSize: "13px", margin: "30px 0" }}>
      <button
        onClick={() => setShowHeatmap(!showHeatmap)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
      </button>

      {showHeatmap && (
        <div>
          <h2 className="text-xl font-bold mb-4">Sensor Heatmap</h2>
          <HeatMap
            xLabels={xLabels}
            yLabels={yLabels}
            data={heatmapData}
            xLabelsLocation={"bottom"}
            xLabelWidth={60}
            yLabelWidth={120}
            squares
            cellStyle={(background, value, min, max) => ({
              background: `rgb(66, 86, 244, ${1 - (max - value) / (max - min)})`,
              color: "#fff"
            })}
            cellRender={value => value && `${value}%`}
          />
        </div>
      )}
    </div>
  );
};

export default SensorHeatmap;
