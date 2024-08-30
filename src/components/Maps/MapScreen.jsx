import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";

const UpdateMapView = ({ center, zoom }) => {
  const map = useMap(); // Dapatkan referensi ke instance peta
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom); // Atur pusat dan zoom peta
    }
  }, [center, zoom, map]);
  return null;
};

const MapScreen = ({ hide, koordinat }) => {
  // Menentukan koordinat pusat default jika tidak ada koordinat yang diberikan
  const defaultCenter = [-2.5, 118.0];
  const defaultZoom = 5;

  // Menghitung koordinat tengah dari array
  const getMiddleCoordinate = () => {
    if (koordinat.length === 0) {
      return defaultCenter; // Menggunakan default jika tidak ada koordinat
    }
    const middleIndex = Math.floor(koordinat.length / 2); // Ambil elemen tengah
    return koordinat[middleIndex];
  };

  const initialCenter = getMiddleCoordinate(); // Mengatur pusat ke koordinat tengah
  const initialZoom = koordinat.length > 0 ? 18 : defaultZoom;

  return (
    <div
      className="absolute top-0 h-screen text-6xl text-white text-center select-none z-0"
      onClick={hide}
    >
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Komponen untuk memperbarui tampilan peta ketika koordinat berubah */}
          <UpdateMapView center={initialCenter} zoom={initialZoom} />
          {koordinat.map((coord, index) => (
            <Marker key={index} position={coord}>
              <Popup>
                <div>
                  <strong>Latitude:</strong> {coord[0]}<br />
                  <strong>Longitude:</strong> {coord[1]}
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
