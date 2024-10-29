import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

// Hardcoded data for simulation
const hardcodedData = [
  { time: '00:00', waterLevel: 50, batteryHealth: 75, sensorUptime: 90 },
  { time: '00:05', waterLevel: 52, batteryHealth: 77, sensorUptime: 92 },
  { time: '00:10', waterLevel: 55, batteryHealth: 70, sensorUptime: 88 },
  { time: '00:15', waterLevel: 53, batteryHealth: 74, sensorUptime: 91 },
  { time: '00:20', waterLevel: 56, batteryHealth: 72, sensorUptime: 89 },
  { time: '00:25', waterLevel: 58, batteryHealth: 78, sensorUptime: 93 },
  { time: '00:30', waterLevel: 60, batteryHealth: 80, sensorUptime: 95 },
  // Add more data points as needed
];

const RealTimeDataPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the sensor ID from URL params
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate real-time data by cycling through hardcoded data
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData, hardcodedData[currentIndex]];
        if (newData.length > 10) newData.shift(); // Keep only last 10 data points
        return newData;
      });
      setCurrentIndex(prevIndex => (prevIndex + 1) % hardcodedData.length);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/sensor/${id}`)} // Navigate to sensor details page
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Sensor Details
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Real-Time Data</h1>
        </div>

        {/* Real-Time Line Chart */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Live Data Updates</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="waterLevel" stroke="#8884d8" name="Water Level" />
              <Line type="monotone" dataKey="batteryHealth" stroke="#82ca9d" name="Battery Health" />
              <Line type="monotone" dataKey="sensorUptime" stroke="#ffc658" name="Sensor Uptime" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDataPage;
