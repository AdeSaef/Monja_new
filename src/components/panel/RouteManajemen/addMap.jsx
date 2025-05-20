import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({ onAddPosition, coord, editable, addMode }) => {
  const [positions, setPositions] = useState([]); // Menyimpan koordinat pin
  const [mapCenter, setMapCenter] = useState(null); // Default null agar tidak merender map sebelum coord tersedia

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
    if (addMode) {
      // Jika addMode aktif, set map center ke Garut
      setMapCenter([-7.2052, 107.9087]);
      return; // Lewati validasi coord
    }

    if (coord && coord.length > 0) {
      const newPositions = coord.map(({ lat, long }) => [lat, long]);
      setPositions(newPositions); // Update state positions dengan koordinat dari prop coord

      // Set map center ke koordinat pertama
      setMapCenter([coord[0].lat, coord[0].long]);
    }
  }, [coord, addMode]); // Akan dipanggil ulang setiap kali coord atau addMode berubah

  // Tampilkan pesan loading jika mapCenter belum diatur (kecuali addMode aktif)
  if (!mapCenter) {
    return <p>Loading map...</p>;
  }

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
