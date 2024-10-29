import React from 'react';
import { FaArrowLeft, FaDownload, FaChartBar } from 'react-icons/fa'; // Importing FaChartBar

const DayDetailPage = () => {
  // Enhanced dummy data with more details
  const dummyData = {
    waterLevel: 123,
    batteryLevel: 87,
    uptime: 92,
    health: 78,
    waterLevelDetails: {
      currentLevel: 123,
      temperature: 26, // Temperature in Celsius
      weatherCondition: 'Clear', // Weather condition on the measurement day
      sensorStatus: 'Active', // Status of the sensor
      measurementDate: '2024-09-18', // Date of the measurement
    },
    historicalData: [
      { day: 1, level: 110, temp: 22, weather: 'Clear', status: 'Normal' },
      { day: 2, level: 115, temp: 23, weather: 'Cloudy', status: 'Normal' },
      { day: 3, level: 120, temp: 24, weather: 'Clear', status: 'Normal' },
      { day: 4, level: 125, temp: 25, weather: 'Rainy', status: 'Warning' },
      { day: 5, level: 130, temp: 26, weather: 'Clear', status: 'Warning' },
      { day: 6, level: 135, temp: 27, weather: 'Clear', status: 'Warning' },
      { day: 7, level: 140, temp: 28, weather: 'Cloudy', status: 'Critical' },
      { day: 8, level: 138, temp: 26, weather: 'Rainy', status: 'Critical' },
      { day: 9, level: 132, temp: 25, weather: 'Clear', status: 'Normal' },
      { day: 10, level: 128, temp: 24, weather: 'Clear', status: 'Normal' },
      { day: 11, level: 130, temp: 23, weather: 'Cloudy', status: 'Normal' },
      { day: 12, level: 135, temp: 22, weather: 'Rainy', status: 'Warning' },
      { day: 13, level: 137, temp: 21, weather: 'Clear', status: 'Warning' },
      { day: 14, level: 140, temp: 22, weather: 'Cloudy', status: 'Critical' },
      { day: 15, level: 142, temp: 23, weather: 'Clear', status: 'Critical' },
      { day: 16, level: 145, temp: 24, weather: 'Clear', status: 'Critical' },
      { day: 17, level: 148, temp: 25, weather: 'Rainy', status: 'Critical' },
      { day: 18, level: 150, temp: 26, weather: 'Cloudy', status: 'Critical' },
      { day: 19, level: 152, temp: 27, weather: 'Clear', status: 'Critical' },
      { day: 20, level: 155, temp: 28, weather: 'Clear', status: 'Critical' },
      { day: 21, level: 158, temp: 29, weather: 'Cloudy', status: 'Critical' },
      { day: 22, level: 160, temp: 30, weather: 'Clear', status: 'Critical' },
      { day: 23, level: 162, temp: 31, weather: 'Rainy', status: 'Critical' },
      { day: 24, level: 164, temp: 32, weather: 'Clear', status: 'Critical' },
      { day: 25, level: 166, temp: 33, weather: 'Clear', status: 'Critical' },
      { day: 26, level: 168, temp: 34, weather: 'Cloudy', status: 'Critical' },
      { day: 27, level: 170, temp: 35, weather: 'Rainy', status: 'Critical' },
      { day: 28, level: 172, temp: 36, weather: 'Clear', status: 'Critical' },
      { day: 29, level: 175, temp: 37, weather: 'Clear', status: 'Critical' },
      { day: 30, level: 180, temp: 38, weather: 'Clear', status: 'Critical' },
    ],
  };

  const { waterLevel, batteryLevel, uptime, health, waterLevelDetails } = dummyData;

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen flex items-center justify-center">
      <div className="w-11/12 lg:w-7/12 max-w-3xl bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center"
            // Placeholder for export functionality
          >
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Water Level Details</h1>

        <div className="mb-6">
          <div className="p-6 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Water Level</h2>
            <p className="text-blue-600 text-2xl font-bold">{waterLevel} cm</p>
            <p className="text-gray-700 mt-2">The water level indicates the amount of water detected by the sensor. A higher value could suggest a rise in water levels, which might be crucial for monitoring purposes.</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Water Level Information</h2>
            <p className="text-gray-700">Current Level: {waterLevelDetails.currentLevel} cm</p>
            <p className="text-gray-700">Temperature: {waterLevelDetails.temperature}°C</p>
            <p className="text-gray-700">Weather Condition: {waterLevelDetails.weatherCondition}</p>
            <p className="text-gray-700">Sensor Status: {waterLevelDetails.sensorStatus}</p>
            <p className="text-gray-700">Measurement Date: {waterLevelDetails.measurementDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Battery Level</h2>
            <p className="text-gray-600 text-lg">{batteryLevel}%</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Uptime</h2>
            <p className="text-gray-600 text-lg">{uptime}%</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Health</h2>
            <p className="text-gray-600 text-lg">{health}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center mx-auto"
            // Placeholder for chart view functionality
          >
            <FaChartBar className="mr-2" />
            View Water Level Trends
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailPage;
