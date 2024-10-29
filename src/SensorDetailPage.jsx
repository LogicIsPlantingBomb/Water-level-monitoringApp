import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowLeft, FaDownload, FaChartLine, FaBatteryHalf, FaWater, FaClock, FaHeartbeat, FaExclamationTriangle, FaRegClock } from 'react-icons/fa';
import SensorHeatmap from './SensorHeatMap'; // Import the SensorHeatmap component

// Function to generate sensor data for 30 days
const generateDailyData = () => {
  const data = [];
  const conditions = ['fine', 'warning', 'alert'];
  for (let i = 0; i < 30; i++) {
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    data.push({
      day: i + 1,
      batteryLevel: Math.floor(Math.random() * 100),
      waterLevel: Math.floor(Math.random() * 1000),
      condition: condition,
      uptime: Math.floor(Math.random() * 20) + 80,
      health: Math.floor(Math.random() * 30) + 70,
    });
  }
  return data;
};

// Custom tooltip to show detailed info on hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
        <p className="font-bold text-gray-700">Day {label}</p>
        <p className="text-sm">Condition: <span className={`capitalize font-semibold ${data.condition === 'fine' ? 'text-green-600' : data.condition === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>{data.condition}</span></p>
        <p className="text-sm">Battery Level: {data.batteryLevel}%</p>
        <p className="text-sm">Water Level: {data.waterLevel} cm</p>
        <p className="text-sm">Uptime: {data.uptime}%</p>
        <p className="text-sm">Health: {data.health}</p>
      </div>
    );
  }
  return null;
};

const SensorDetailPage = () => {
  const { id } = useParams();  // Get sensor ID from route parameters
  const navigate = useNavigate(); // Navigation hook to redirect to detail page
  const initialData = generateDailyData(); // Generate data for 30 days
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showHeatmap, setShowHeatmap] = useState(false); // State to manage heatmap visibility

  // Handle dot click and navigate to the day detail page with the day's data
  const handleDotClick = (dayData) => {
    navigate(`/sensor/${id}/day/${dayData.day}`, {
      state: {
        day: dayData.day,
        batteryLevel: dayData.batteryLevel,
        waterLevel: dayData.waterLevel,
        condition: dayData.condition,
        uptime: dayData.uptime,
        health: dayData.health,
      },
    });
  };

  // Apply filter and sort to the data
  const filterAndSortData = () => {
    let filteredData = data;
    if (filter !== 'all') {
      filteredData = data.filter(d => d.condition === filter);
    }
    if (sortOrder === 'asc') {
      filteredData = filteredData.sort((a, b) => a.day - b.day);
    } else {
      filteredData = filteredData.sort((a, b) => b.day - a.day);
    }
    return filteredData;
  };

  const filteredSortedData = filterAndSortData();

  // Prepare data for heatmap
  const waterLevels = filteredSortedData.map(d => d.waterLevel);
  const batteryHealth = filteredSortedData.map(d => d.batteryLevel);
  const labels = filteredSortedData.map(d => `Day ${d.day}`);

  // Function to render a line chart for different data keys
  const renderChart = (title, dataKey, color) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredSortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "white",
              stroke: (entry) => entry.condition === 'fine' ? '#4CAF50' : entry.condition === 'warning' ? '#FFC107' : '#F44336',
            }}
            activeDot={{
              r: 6,
              onClick: (event, payload) => handleDotClick(payload),  // onClick event handler for the dot
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        {/* Sensor Details Section with gradient background */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-md mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center">
              <span className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md text-center">
                DWLR Sensor {id} Details
              </span>
            </h1>
            <button
              className="absolute top-0 right-0 mt-2 mr-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center"
            >
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
          <p className="text-white mt-4 text-center">
            This page provides detailed insights into the performance and status of the selected DWLR sensor. You can view various metrics and trends over the past 30 days.
          </p>
        </div>

        {/* Filter and Sort Options */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Filter by Condition:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded p-2"
              >
                <option value="all">All</option>
                <option value="fine">Fine</option>
                <option value="warning">Warning</option>
                <option value="alert">Alert</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Sort Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded p-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line Charts for Battery Level, Water Level, Uptime, and Health */}
        <div className="space-y-8">
          {renderChart("Battery Level (%)", "batteryLevel", "#ffc658")}
          {renderChart("Water Level (cm)", "waterLevel", "#ff7300")}
          {renderChart("Device Uptime (%)", "uptime", "#8884d8")}
          {renderChart("Health Score", "health", "#82ca9d")}
        </div>

        {/* Heatmap */}
        <SensorHeatmap data={{ waterLevels, batteryHealth }} labels={labels} />

        {/* Button to View Anomalies */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(`/sensor/${id}/anomaly-detection`)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center mx-auto"
          >
            <FaExclamationTriangle className="mr-2" />
            View Anomalies
          </button>
        </div>

        {/* Button to View Real-Time Data */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(`/sensor/${id}/realtime`)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center mx-auto"
          >
            <FaChartLine className="mr-2" />
            View Real-Time Data
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center mx-auto"
          >
            <FaArrowLeft className="mr-2" />
            Back to Sensors
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorDetailPage;
