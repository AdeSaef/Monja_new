import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Atur ikon default
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LeafletMap = () => {
  const [positions, setPositions] = useState([]);
  const [map, setMap] = useState(null);

  const addMarker = (e) => {
    const newPositions = [...positions, e.latlng];
    if (newPositions.length > 2) newPositions.shift();
    setPositions(newPositions);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: addMarker,
    });
    return null;
  };

  useEffect(() => {
    if (map && positions.length === 2) {
      // Buat kontrol routing
      const routingControl = L.Routing.control({
        waypoints: positions.map((pos) => L.latLng(pos.lat, pos.lng)),
        routeWhileDragging: true,
        createMarker: () => null,
      }).addTo(map);

      return () => {
        // Hapus kontrol routing saat komponen di-unmount atau dependensi berubah
        map.removeControl(routingControl);
      };
    }
  }, [map, positions]);

  return (
    <MapContainer
      center={[-6.1751, 106.865]} // Contoh: koordinat Jakarta
      zoom={17}
      style={{ height: "500px", width: "100%" }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((pos, index) => (
        <Marker key={index} position={pos}></Marker>
      ))}
      <MapClickHandler />
    </MapContainer>
  );
};

export default LeafletMap;
