import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WindowCardProps {
  title: string;
  onStationClick: (prices: Record<string, number>) => void;
}

interface Station {
  lat: number;
  lon: number;
  tags: {
    name?: string;
  };
}

const WindowCard: React.FC<WindowCardProps> = ({ title, onStationClick }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [stations, setStations] = useState<Station[]>([]);

  const customGasIcon = {
    iconImage: 'https://i.imgur.com/2HImCfx.png',
    iconSize: [40, 40] as [number, number], // Fix the tuple type for iconSize
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoieW9ldm0iLCJhIjoiY20xeW1wNG9sMGJmZzJxb2g2aDVoaXdwdyJ9.a1Zzrl7f94l0Uzix36S4ig';

    // Initialize the Mapbox map inside WindowCard
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-104.9903, 39.7392],
      zoom: 12,
      pitch: 60,
      bearing: -10,
    });

    mapRef.current.on('load', () => {
      fetchGasStations(); // Fetch gas stations data when the map is loaded
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const fetchGasStations = async () => {
    try {
      const response = await fetch(
        'https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=fuel](around:5000,39.7392,-104.9903);out;'
      );
      const data = await response.json();
      setStations(data.elements);

      data.elements.forEach((station: Station) => {
        const marker = new mapboxgl.Marker({ element: createIconElement(customGasIcon) })
          .setLngLat([station.lon, station.lat])
          .addTo(mapRef.current as mapboxgl.Map);

        marker.getElement().addEventListener('click', () => {
          handleStationClick({
            E85: 3.25,
            87: 3.10,
            89: 3.40,
            Diesel: 3.75,
          });
        });
      });
    } catch (err) {
      console.error('Error fetching gas stations:', err);
    }
  };

  const createIconElement = (iconData: { iconImage: string; iconSize: [number, number] }) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = `url(${iconData.iconImage})`;
    el.style.width = `${iconData.iconSize[0]}px`;
    el.style.height = `${iconData.iconSize[1]}px`;
    el.style.backgroundSize = 'cover';
    return el;
  };

  const handleStationClick = (prices: Record<string, number>) => {
    onStationClick(prices); // Pass prices to parent component
  };

  return (
    <article className="window-card" data-glow>
      <span data-glow />
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }}></div>
    </article>
  );
};

export default WindowCard;
