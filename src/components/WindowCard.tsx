import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker for user's location
const customIcon = new L.Icon({
  iconUrl: 'https://i.imgur.com/lnbx41i.png', // Replace with your custom user icon URL
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Custom marker for gas stations
const gasStationIcon = new L.Icon({
  iconUrl: 'https://i.imgur.com/2HImCfx.png', // Custom gas station icon URL
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface WindowCardProps {
  title: string;
  onStationClick: (prices: any) => void; // Callback to send fuel prices to parent
}

const WindowCard: React.FC<WindowCardProps> = ({ title, onStationClick }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);

      // Fetch gas stations nearby using Overpass API
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=fuel](around:5000,${latitude},${longitude});out;`;

      fetch(overpassUrl)
        .then((res) => res.json())
        .then((data) => {
          setStations(data.elements);
        })
        .catch((err) => console.error(err));
    });
  }, []);

  const handleStationClick = (station: any) => {
    // Mock fuel prices for each station (replace with real API call)
    const fuelPrices = {
      E85: 3.25,
      87: 3.10,
      89: 3.40,
      Diesel: 3.75,
    };
    onStationClick(fuelPrices); // Pass prices to parent component
  };

  return (
    <article className="window-card" data-glow>
      <span data-glow />
      {position ? (
        <MapContainer
          center={position as [number, number]}  // Ensure it's recognized as [number, number]
          zoom={13}
          style={{ height: '100%', width: '100%' }}  // Full height and width of the card
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's current location marker */}
          <Marker position={position} icon={customIcon}>
            <Popup>{title}</Popup>
          </Marker>

          {/* Display gas stations as markers with custom icon */}
          {stations.map((station, index) => (
            <Marker
              key={index}
              position={[station.lat, station.lon]}
              icon={gasStationIcon} // Custom gas station icon
              eventHandlers={{
                click: () => handleStationClick(station), // When station marker is clicked
              }}
            >
              <Popup>{station.tags.name || 'Gas Station'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </article>
  );
};

export default WindowCard;
