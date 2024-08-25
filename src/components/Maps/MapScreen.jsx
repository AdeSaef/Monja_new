import React from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { routes } from "../panel/MapsKonten/dataRoute";

const MapScreen = ({ hide, data }) => {

  // Temukan rute untuk "Garut Kota"
  const garutRoute = routes.find(route => route.name === "Garut Kota");

  // Jika rute ditemukan, ambil koordinat yang sesuai dengan tanggal yang dipilih
  const garutCoordinates = garutRoute
    ? garutRoute.coordinates.filter(coord => coord.date === "2024-05-21")
    : [];

  return (
    <div
      className="absolute top-0 h-screen text-6xl text-white text-center select-none z-0"
      onClick={hide}
    >
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer
          center={[-6.928, 107.633]}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {garutCoordinates.map((coord, index) => (
            <Marker key={index} position={[coord.lat, coord.lon]}>
              <Popup>
                <div>
                  <strong>Date:</strong> {coord.date}<br />
                  <strong>Time:</strong> {coord.time}
                </div>
              </Popup>
            </Marker>
          ))}
          <ZoomControl position="bottomleft" />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapScreen;
