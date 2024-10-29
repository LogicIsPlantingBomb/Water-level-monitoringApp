import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon function
const createCustomIcon = (condition) => {
  const colorMap = {
    fine: '#4CAF50',    // Green
    warning: '#FFC107', // Yellow
    alert: '#F44336'    // Red
  };

  const textMap = {
    fine: 'F',
    warning: 'W',
    alert: 'A'
  };

  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        background-color: ${colorMap[condition]};
        width: 20px;  /* Reduced size */
        height: 20px; /* Reduced size */
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px; /* Adjust text size */
        color: white;
        font-weight: bold;
      ">
        ${textMap[condition]}
      </div>
    `,
    iconSize: [18, 18],  // Adjusted size
    iconAnchor: [7, 7]
  });
};
// Hardcoded sensor data with additional attributes
const sensorData = [
  { id: 1, name: "DWLR Sensor 1", position: [28.6139, 77.2090], condition: "fine", waterLevel: 5.4, temperature: 28, humidity: 60, airQuality: "Good", pressure: 1012 },
  { id: 2, name: "DWLR Sensor 2", position: [19.0760, 72.8777], condition: "warning", waterLevel: 6.2, temperature: 32, humidity: 55, airQuality: "Moderate", pressure: 1010 },
  { id: 3, name: "DWLR Sensor 3", position: [22.5726, 88.3639], condition: "alert", waterLevel: 7.1, temperature: 30, humidity: 70, airQuality: "Poor", pressure: 1008 },
  { id: 4, name: "DWLR Sensor 4", position: [13.0827, 80.2707], condition: "fine", waterLevel: 4.8, temperature: 29, humidity: 65, airQuality: "Good", pressure: 1015 },
  { id: 5, name: "DWLR Sensor 5", position: [17.3850, 78.4867], condition: "warning", waterLevel: 5.9, temperature: 31, humidity: 58, airQuality: "Moderate", pressure: 1011 },
  { id: 6, name: "DWLR Sensor 6", position: [12.9716, 77.5946], condition: "fine", waterLevel: 4.6, temperature: 27, humidity: 62, airQuality: "Good", pressure: 1013 },
  { id: 7, name: "DWLR Sensor 7", position: [23.0225, 72.5714], condition: "alert", waterLevel: 6.8, temperature: 33, humidity: 75, airQuality: "Poor", pressure: 1007 },
  { id: 8, name: "DWLR Sensor 8", position: [26.8467, 80.9462], condition: "fine", waterLevel: 5.2, temperature: 28, humidity: 60, airQuality: "Good", pressure: 1014 },
  { id: 9, name: "DWLR Sensor 9", position: [18.5204, 73.8567], condition: "warning", waterLevel: 6.0, temperature: 32, humidity: 55, airQuality: "Moderate", pressure: 1010 },
  { id: 10, name: "DWLR Sensor 10", position: [26.9124, 75.7873], condition: "fine", waterLevel: 4.9, temperature: 27, humidity: 64, airQuality: "Good", pressure: 1015 },
  { id: 11, name: "DWLR Sensor 11", position: [21.1458, 79.0882], condition: "alert", waterLevel: 7.0, temperature: 34, humidity: 78, airQuality: "Poor", pressure: 1009 },
  { id: 12, name: "DWLR Sensor 12", position: [30.7333, 76.7794], condition: "fine", waterLevel: 5.5, temperature: 26, humidity: 59, airQuality: "Good", pressure: 1012 },
  { id: 13, name: "DWLR Sensor 13", position: [25.5941, 85.1376], condition: "warning", waterLevel: 6.3, temperature: 31, humidity: 62, airQuality: "Moderate", pressure: 1011 },
  { id: 14, name: "DWLR Sensor 14", position: [23.2599, 77.4126], condition: "fine", waterLevel: 4.7, temperature: 28, humidity: 60, airQuality: "Good", pressure: 1014 },
  { id: 15, name: "DWLR Sensor 15", position: [22.7196, 75.8577], condition: "alert", waterLevel: 6.9, temperature: 35, humidity: 80, airQuality: "Poor", pressure: 1008 },
  { id: 16, name: "DWLR Sensor 16", position: [28.7041, 77.1025], condition: "fine", waterLevel: 5.1, temperature: 29, humidity: 63, airQuality: "Good", pressure: 1013 },
  { id: 17, name: "DWLR Sensor 17", position: [11.0168, 76.9558], condition: "warning", waterLevel: 6.1, temperature: 30, humidity: 60, airQuality: "Moderate", pressure: 1011 },
  { id: 18, name: "DWLR Sensor 18", position: [31.1048, 77.1734], condition: "fine", waterLevel: 4.5, temperature: 27, humidity: 64, airQuality: "Good", pressure: 1012 },
  { id: 19, name: "DWLR Sensor 19", position: [26.1445, 91.7362], condition: "alert", waterLevel: 7.2, temperature: 34, humidity: 76, airQuality: "Poor", pressure: 1007 },
  { id: 20, name: "DWLR Sensor 20", position: [20.2961, 85.8245], condition: "fine", waterLevel: 5.3, temperature: 28, humidity: 61, airQuality: "Good", pressure: 1015 },
  { id: 21, name: "DWLR Sensor 21", position: [23.3441, 85.3096], condition: "warning", waterLevel: 6.4, temperature: 32, humidity: 57, airQuality: "Moderate", pressure: 1010 },
  { id: 22, name: "DWLR Sensor 22", position: [9.9312, 76.2673], condition: "fine", waterLevel: 5.6, temperature: 27, humidity: 62, airQuality: "Good", pressure: 1014 },
  { id: 23, name: "DWLR Sensor 23", position: [16.5062, 80.6480], condition: "alert", waterLevel: 6.7, temperature: 33, humidity: 74, airQuality: "Poor", pressure: 1008 },
  { id: 24, name: "DWLR Sensor 24", position: [21.2514, 81.6296], condition: "fine", waterLevel: 4.8, temperature: 29, humidity: 60, airQuality: "Good", pressure: 1013 },
  { id: 25, name: "DWLR Sensor 25", position: [25.3176, 82.9739], condition: "warning", waterLevel: 6.2, temperature: 31, humidity: 63, airQuality: "Moderate", pressure: 1011 },
  { id: 26, name: "DWLR Sensor 26", position: [19.9975, 73.7898], condition: "fine", waterLevel: 4.7, temperature: 28, humidity: 60, airQuality: "Good", pressure: 1014 },
  { id: 27, name: "DWLR Sensor 27", position: [27.1767, 78.0081], condition: "alert", waterLevel: 7.0, temperature: 34, humidity: 77, airQuality: "Poor", pressure: 1009 },
  { id: 28, name: "DWLR Sensor 28", position: [22.3072, 73.1812], condition: "fine", waterLevel: 5.2, temperature: 29, humidity: 62, airQuality: "Good", pressure: 1015 },
  { id: 29, name: "DWLR Sensor 29", position: [30.9010, 75.8573], condition: "warning", waterLevel: 6.1, temperature: 31, humidity: 58, airQuality: "Moderate", pressure: 1012 },
  { id: 30, name: "DWLR Sensor 30", position: [26.4499, 80.3319], condition: "fine", waterLevel: 4.8, temperature: 27, humidity: 60, airQuality: "Good", pressure: 1014 },
  { id: 31, name: "DWLR Sensor 31", position: [11.6643, 78.1460], condition: "alert", waterLevel: 6.5, temperature: 35, humidity: 80, airQuality: "Poor", pressure: 1008 },
  { id: 32, name: "DWLR Sensor 32", position: [19.7401, 75.8836], condition: "fine", waterLevel: 5.4, temperature: 28, humidity: 64, airQuality: "Good", pressure: 1013 },
  { id: 33, name: "DWLR Sensor 33", position: [23.3441, 85.3096], condition: "warning", waterLevel: 6.3, temperature: 32, humidity: 59, airQuality: "Moderate", pressure: 1010 },
  { id: 34, name: "DWLR Sensor 34", position: [25.5967, 85.0281], condition: "fine", waterLevel: 4.6, temperature: 27, humidity: 61, airQuality: "Good", pressure: 1014 },
  { id: 35, name: "DWLR Sensor 35", position: [21.1702, 72.8311], condition: "alert", waterLevel: 7.1, temperature: 34, humidity: 77, airQuality: "Poor", pressure: 1009 },
  { id: 36, name: "DWLR Sensor 36", position: [19.0760, 72.8777], condition: "fine", waterLevel: 5.3, temperature: 30, humidity: 62, airQuality: "Good", pressure: 1015 },
  { id: 37, name: "DWLR Sensor 37", position: [28.6128, 77.2294], condition: "warning", waterLevel: 6.4, temperature: 32, humidity: 57, airQuality: "Moderate", pressure: 1011 },
  { id: 38, name: "DWLR Sensor 38", position: [12.9716, 77.5946], condition: "fine", waterLevel: 4.9, temperature: 29, humidity: 60, airQuality: "Good", pressure: 1014 },
  { id: 39, name: "DWLR Sensor 39", position: [25.5941, 85.1376], condition: "alert", waterLevel: 6.8, temperature: 35, humidity: 78, airQuality: "Poor", pressure: 1007 },
  { id: 40, name: "DWLR Sensor 40", position: [19.0760, 72.8777], condition: "fine", waterLevel: 5.6, temperature: 27, humidity: 62, airQuality: "Good", pressure: 1013 },
	 { id: 41, name: "DWLR Sensor 41", position: [22.5726, 88.3639], condition: "fine", waterLevel: 5.1, temperature: 27, humidity: 60, airQuality: "Good", pressure: 1012 },
  { id: 42, name: "DWLR Sensor 42", position: [13.0827, 80.2707], condition: "warning", waterLevel: 6.2, temperature: 31, humidity: 58, airQuality: "Moderate", pressure: 1011 },
  { id: 43, name: "DWLR Sensor 43", position: [17.3850, 78.4867], condition: "alert", waterLevel: 7.0, temperature: 33, humidity: 75, airQuality: "Poor", pressure: 1008 },
  { id: 44, name: "DWLR Sensor 44", position: [12.9716, 77.5946], condition: "fine", waterLevel: 5.4, temperature: 29, humidity: 62, airQuality: "Good", pressure: 1014 },
  { id: 45, name: "DWLR Sensor 45", position: [23.0225, 72.5714], condition: "warning", waterLevel: 6.1, temperature: 30, humidity: 61, airQuality: "Moderate", pressure: 1010 },
  { id: 46, name: "DWLR Sensor 46", position: [20.2961, 85.8245], condition: "fine", waterLevel: 4.8, temperature: 28, humidity: 63, airQuality: "Good", pressure: 1013 },
  { id: 47, name: "DWLR Sensor 47", position: [30.7333, 76.7794], condition: "alert", waterLevel: 6.5, temperature: 35, humidity: 77, airQuality: "Poor", pressure: 1009 },
  { id: 48, name: "DWLR Sensor 48", position: [26.9124, 75.7873], condition: "fine", waterLevel: 5.3, temperature: 29, humidity: 60, airQuality: "Good", pressure: 1015 },
  { id: 49, name: "DWLR Sensor 49", position: [31.1048, 77.1734], condition: "warning", waterLevel: 6.2, temperature: 32, humidity: 58, airQuality: "Moderate", pressure: 1012 },
  { id: 50, name: "DWLR Sensor 50", position: [25.3176, 82.9739], condition: "alert", waterLevel: 7.1, temperature: 34, humidity: 76, airQuality: "Poor", pressure: 1008 },
];

const MapChart = () => {
  const [sensors] = useState(sensorData);  // Assuming sensorData is defined elsewhere
  const navigate = useNavigate();

  const handleSensorClick = (sensorId) => {
    navigate(`/sensor/${sensorId}`);
  };

  return (
    <div className="flex justify-center" style={{ height: '100vh', width: '100vw' }}>
      <MapContainer className="flex justify-center" center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sensors.map((sensor) => (
          <Marker 
            key={sensor.id} 
            position={sensor.position}
            icon={createCustomIcon(sensor.condition)}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{sensor.name}</h3>
                <p>Condition: <span className={`capitalize ${sensor.condition === 'fine' ? 'text-green-600' : sensor.condition === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>{sensor.condition}</span></p>
		  <p>Humidity: {sensor.humidity}%</p>
                <p>Temperature: {sensor.temperature}°C</p>
                <button 
                  onClick={() => handleSensorClick(sensor.id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapChart;

