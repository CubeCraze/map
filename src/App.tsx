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
  const [fuelPrices, setFuelPrices] = useState({
    E85: null,
    87: null,
    89: null,
    Diesel: null,
  });

  // Update the fuel prices when a station is clicked
  const handleStationClick = (prices: any) => {
    setFuelPrices(prices);
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <main>
        <Background />
        <LeftSidebar />
        <RightSidebar />
        <div className="content">
          <button style={{ marginBottom: '20px', marginTop: '20px' }}>
            Hide Map
          </button>
          <div className="window-row" style={{ height: '400px', overflow: 'hidden' }}>
            <WindowCard title="Your Location Map" onStationClick={handleStationClick} />
          </div>
          <div className="cards-row">
            {/* Fuel Price ArticleCards, passing in the respective prices */}
            <ArticleCard fuelType="E85" price={fuelPrices.E85} />
            <ArticleCard fuelType="87" price={fuelPrices[87]} />
            <ArticleCard fuelType="89" price={fuelPrices[89]} />
            <ArticleCard fuelType="Diesel" price={fuelPrices.Diesel} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
