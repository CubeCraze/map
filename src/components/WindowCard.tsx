import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://i.imgur.com/Ry2zCfB.png', // Replace with your custom icon URL
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // Optional shadow
  shadowSize: [50, 64], // Shadow size
  shadowAnchor: [4, 62], // Shadow anchor
});

interface WindowCardProps {
  title: string;
}

const WindowCard: React.FC<WindowCardProps> = ({ title }) => {
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
          
          {/* User's custom location marker */}
          <Marker position={position} icon={customIcon}>
            <Popup>{title}</Popup>
          </Marker>

          {/* Display gas stations as markers */}
          {stations.map((station, index) => (
            <Marker
              key={index}
              position={[station.lat, station.lon]}
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
