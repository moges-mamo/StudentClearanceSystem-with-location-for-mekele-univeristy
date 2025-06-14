import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const officeLocations = {
    'Registrar Office': { lat: 13.477998134409221, lng: 39.484543641131964 },
    'Library': { lat: 13.480208642520019, lng: 39.48382496898598 },
    'Cafeteria': { lat: 13.478859261721732, lng: 39.483630848073446 },
    'Proctor': { lat: 13.478719787222674, lng: 39.481711923720255 },
    'Head Department': { lat: 13.48109904438774, lng: 39.4856430854831 },
    'Kenean Dormitory': { lat: 13.482357960605547, lng: 39.48304282908609 },
    'Gedam Mender': { lat: 13.48177303985183, lng: 39.487957912954705 },
    'Science Library': { lat: 13.479061626923208, lng: 39.48478057349086 },
    'Africa Meles Dormitory': { lat: 13.481410022041148, lng: 39.48307774151288 }
  };

  const startLocation = { lat: 13.476684764810232, lng: 39.48472192504586 }; // Mitiku Haile Adarsh

  useEffect(() => {
    const map = L.map('map').setView([startLocation.lat, startLocation.lng], 17);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    Object.entries(officeLocations).forEach(([name, coords]) => {
      const marker = L.marker([coords.lat, coords.lng], { icon }).addTo(map);
      marker.bindPopup(`<b>${name}</b><br/><button id="route-${name.replace(/\s/g, '')}">Route to this place</button>`);
      marker.on('popupopen', () => {
        setTimeout(() => {
          const btn = document.getElementById(`route-${name.replace(/\s/g, '')}`);
          if (btn) {
            btn.addEventListener('click', () => {
              drawRoute(coords);
            });
          }
        }, 100);
      });
    });

    setMapLoaded(true);
  }, []);

  const drawRoute = (destination) => {
    if (!mapRef.current) return;

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(startLocation.lat, startLocation.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
      createMarker: () => null
    }).addTo(mapRef.current);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', padding: '10px', background: '#f9f9f9', overflowY: 'auto' }}>
        <h3>Navigate To:</h3>
        {Object.entries(officeLocations).map(([name, coords]) => (
          <button
            key={name}
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            onClick={() => drawRoute(coords)}
          >
            {name}
          </button>
        ))}
      </div>
      <div id="map" style={{ flex: 1 }}></div>
    </div>
  );
};

export default MapComponent;
