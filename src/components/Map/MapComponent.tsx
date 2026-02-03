
'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dynamically import React-Leaflet components to avoid SSR issues
// Dynamically import React-Leaflet components to avoid SSR issues
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

interface MapComponentProps {
  userLocation?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function MapComponent({ userLocation, onLocationSelect }: MapComponentProps) {
  // Default position: Panvel, India
  const defaultPosition: [number, number] = [18.9894, 73.1175]; 
  const position = userLocation || defaultPosition;

  useEffect(() => {
    // Client-side only icon fix
    // Check if icon is already set to avoid re-setting repeatedly (optional, but good for perf)
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []); 

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {userLocation ? "Your Location" : "Panvel"} <br /> Start your ride here.
          </Popup>
        </Marker>
        <RecenterMap center={position} />
        {onLocationSelect && <LocationSelector onSelect={onLocationSelect} />}
      </MapContainer>
    </div>
  );
}

function RecenterMap({ center }: { center: [number, number] }) {
   const map = useMap();
   useEffect(() => {
     if (map) {
         map.setView(center, map.getZoom());
     }
   }, [center, map]);
   return null;
}

function LocationSelector({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}
