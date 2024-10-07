import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface WindowCardProps {
  title: string;
}

const WindowCard: React.FC<WindowCardProps> = ({ title }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{title}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </article>
  );
};

export default WindowCard;
