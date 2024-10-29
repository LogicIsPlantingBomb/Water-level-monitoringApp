import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import MapChart from './MapChart';
import SensorDetailPage from './SensorDetailPage';
import DayDetailPage from './DayDetailPage'; // Import DayDetailPage component
import 'leaflet/dist/leaflet.css';
import AnomalyDetectionPage from './AnomalyDetectionPage';
import RealTimeDataPage from './RealTimeDataPage ';

function App() {
  return (
    <Router>
      <div className="App bg-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto py-12 flex justify-center px-4 sm:px-6 lg:px-8">
              <MapChart />
            </div>
          } />
          <Route path="/sensor/:id" element={
            <>
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" style={{textDecoration:"None"}}>
                  Back to Map
                </Link>
              </div>
              <SensorDetailPage />
            </>
          } />
          {/* Route for the day-wise detailed information of the sensor */}
          <Route path="/sensor/:id/day/:day" element={
            <DayDetailWrapper />
          } />
           <Route path="/sensor/:id" element={<SensorDetailPage />} />
           <Route path="/sensor/:id/anomaly-detection" element={<AnomalyDetectionPage />} />
           {/* <Route path="/sensor/:id/realtime-data" element={<RealTimeDataPage />} /> */}
           <Route path="/sensor/:id/realtime" element={<RealTimeDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function DayDetailWrapper() {
  const { id } = useParams();
  return (
    <>
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Link to={`/sensor/${id}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" style={{textDecoration:"None"}}>
          Back to Sensor Details
        </Link>
      </div>
      <DayDetailPage />
    </>
  );
}

function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-wide">DWLR Sensors in India</h1>
        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link 
            to="/" 
            className="px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-300" 
            style={{ textDecoration: "none", backgroundColor: "#fff", color: "#000" }} 
            onMouseEnter={e => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
          >
            Home
          </Link>

          {/* Learn More Link */}
          <a 
            href="https://example.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-300" 
            style={{ textDecoration: "none", backgroundColor: "#fff", color: "#000" }}
            onMouseEnter={e => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
          >
            Learn More
          </a>

          {/* Contact Us Link */}
          <a 
            href="mailto:info@dwlrsensors.com" 
            className="px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-300" 
            style={{ textDecoration: "none", backgroundColor: "#fff", color: "#000" }}
            onMouseEnter={e => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}



export default App;
