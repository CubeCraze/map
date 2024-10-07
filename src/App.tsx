import React, { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WindowCard from './components/WindowCard';
import ArticleCard from './components/ArticleCard';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel';
import './main.css';

function App() {
  const [showMap, setShowMap] = useState(true);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <main>
        <Background />
        <LeftSidebar />
        <RightSidebar />
        <div className="content">
          <button onClick={toggleMap} style={{ marginBottom: '20px', marginTop: '20px' }}>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
          <div className="window-row" style={{ height: '400px', overflow: 'hidden' }}> {/* Set height to 400px */}
            {showMap && (
              <WindowCard title="Your Location Map" />
            )}
          </div>
          <div className="cards-row">
            {/* Fuel Price ArticleCards */}
            <ArticleCard fuelType="E85" />
            <ArticleCard fuelType="87" />
            <ArticleCard fuelType="89" />
            <ArticleCard fuelType="Diesel" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;