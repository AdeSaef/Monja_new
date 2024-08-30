import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ onAddPosition }) => {
  const [positions, setPositions] = useState([]); // Menyimpan koordinat pin

  // Fungsi untuk menambahkan pin
  const addMarker = (e) => {
    const { lat, lng } = e.latlng; // Ambil koordinat dari event klik
    const newPosition = [lat, lng]; // Bentuk array koordinat [lat, lng]
    const newPositions = [...positions, newPosition]; // Tambahkan pin baru ke dalam array
    setPositions(newPositions); // Update state dengan array baru
    onAddPosition(newPosition); // Mengirim koordinat baru ke komponen induk
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: addMarker, // Memanggil addMarker saat peta diklik
    });
    return null;
  };

  return (
    <MapContainer
      center={[-7.2147, 107.8997]} // Contoh: koordinat Garut
      zoom={17}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((pos, index) => (
        <Marker key={index} position={pos}></Marker> // Menampilkan semua pin
      ))}
      <MapClickHandler />
    </MapContainer>
  );
};

export default LeafletMap;
