import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ onAddPosition, coord, editable }) => {
  const [positions, setPositions] = useState([]); // Menyimpan koordinat pin
  const [mapCenter, setMapCenter] = useState([-7.2147, 107.8997]); // Default center jika coord kosong

  // Fungsi untuk menambahkan pin
  const addMarker = (e) => {
    const { lat, lng } = e.latlng; // Ambil koordinat dari event klik
    const newPosition = [lat, lng]; // Bentuk array koordinat [lat, lng]
    const newPositions = [...positions, newPosition]; // Tambahkan pin baru ke dalam array
    setPositions(newPositions); // Update state dengan array baru
    onAddPosition(newPosition); // Mengirim koordinat baru ke komponen induk
  };

  // Fungsi untuk menangani klik pada peta
  const MapClickHandler = () => {
    useMapEvents({
      click: addMarker,
    });
    return null;
  };

  // Set positions dan map center berdasarkan data dari coord
  useEffect(() => {
    if (coord && coord.length > 0) {
      const newPositions = coord.map(({ lat, long }) => [lat, long]);
      setPositions(newPositions); // Update state positions dengan koordinat dari prop coord

      // Menghitung center peta berdasarkan nilai rata-rata dari latitude dan longitude
      const avgLat =
        newPositions.reduce((acc, pos) => acc + pos[0], 0) / newPositions.length;
      const avgLong =
        newPositions.reduce((acc, pos) => acc + pos[1], 0) / newPositions.length;
      setMapCenter([avgLat, avgLong]); // Set map center ke nilai rata-rata
    }
  }, [coord]); // Akan dipanggil ulang setiap kali coord berubah

  return (
    <MapContainer
      center={mapCenter}
      zoom={17}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((pos, index) => (
        <Marker key={index} position={pos}></Marker>
      ))}
      {editable && <MapClickHandler />}
    </MapContainer>
  );
};

export default LeafletMap;
