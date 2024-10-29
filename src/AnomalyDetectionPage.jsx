import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Hardcoded anomaly data
const anomalyData = [
  { day: 1, anomalyType: 'Battery Level Drop', description: 'Significant drop in battery level.', severity: 'High' },
  { day: 5, anomalyType: 'Water Leak', description: 'Unusual increase in water level.', severity: 'Medium' },
  { day: 12, anomalyType: 'Health Degradation', description: 'Health score dropped below threshold.', severity: 'High' },
  { day: 20, anomalyType: 'Uptime Decrease', description: 'Uptime significantly decreased.', severity: 'Low' },
  { day: 28, anomalyType: 'Alert Condition', description: 'Condition is in alert state.', severity: 'High' },
];

// Generate chart data from hardcoded anomaly data
const generateChartData = (data) => {
  const severityCount = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  const typeCount = {};

  data.forEach(anomaly => {
    severityCount[anomaly.severity]++;
    typeCount[anomaly.anomalyType] = (typeCount[anomaly.anomalyType] || 0) + 1;
  });

  return {
    severityChartData: Object.keys(severityCount).map(key => ({
      name: key,
      count: severityCount[key],
    })),
    typeChartData: Object.keys(typeCount).map(key => ({
      name: key,
      count: typeCount[key],
    })),
  };
};

const AnomalyDetectionPage = () => {
  const { id } = useParams(); // Get sensor ID from route parameters
  const navigate = useNavigate(); // Navigation hook to redirect to previous page
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pieData, setPieData] = useState(generateChartData(anomalyData).typeChartData);

  const filteredData = anomalyData.filter(anomaly => filter === 'all' || anomaly.severity.toLowerCase() === filter);
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === 'asc') return a.day - b.day;
    return b.day - a.day;
  });

  const { severityChartData, typeChartData } = generateChartData(anomalyData);

  // Additional data for radar chart
  const radarData = [
    { subject: 'Battery Level Drop', A: 4, B: 2 },
    { subject: 'Water Leak', A: 3, B: 1 },
    { subject: 'Health Degradation', A: 4, B: 3 },
    { subject: 'Uptime Decrease', A: 2, B: 2 },
    { subject: 'Alert Condition', A: 5, B: 4 },
  ];

  // Function to update Pie Chart data dynamically
  const updatePieData = () => {
    // Generate new random data for the Pie Chart to simulate updates
    const newData = typeChartData.map(entry => ({
      ...entry,
      count: Math.floor(Math.random() * 10) + 1, // Random count between 1 and 10
    }));
    setPieData(newData);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/sensor/${id}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Anomaly Detection for Sensor {id}</h1>
        </div>

        {/* Filter Options */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center space-x-4">
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">Filter by Severity:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Anomaly Charts */}
        <div className="space-y-8 mb-8">
          {/* Bar Chart for Severity Count */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Severity Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for Anomaly Types */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Anomaly Types</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={120}
                  label
                  animationDuration={1500} // Add animation duration
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ff7300', '#387908', '#8c8c8c', '#a4de6c', '#d0ed57'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <button
              onClick={updatePieData}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Refresh Data
            </button>
          </div>

          {/* Line Chart for Anomaly Over Days */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Anomalies Over Days</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="day" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart for Anomaly Type Comparison */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Anomaly Type Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={120} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Severity Level A" dataKey="A" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                <Radar name="Severity Level B" dataKey="B" stroke="#387908" fill="#387908" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center space-x-4">
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

        {/* Anomaly List */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Anomaly Details</h2>
          <ul className="space-y-4">
            {sortedData.map((anomaly) => (
              <li key={anomaly.day} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Day {anomaly.day}</h3>
                <p><strong>Type:</strong> {anomaly.anomalyType}</p>
                <p><strong>Description:</strong> {anomaly.description}</p>
                <p><strong>Severity:</strong> <span className={`capitalize font-semibold ${anomaly.severity.toLowerCase() === 'high' ? 'text-red-600' : anomaly.severity.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>{anomaly.severity}</span></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetectionPage;
