import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from 'leaflet';
import { getDetailSurvey } from "../../services/surveyService";


const UpdateMapView = ({ center, zoom }) => {
  const map = useMap(); // Dapatkan referensi ke instance peta
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom); // Atur pusat dan zoom peta
    }
  }, [center, zoom, map]);
  return null;
};

const getPinColor = (status) => {
  switch (status) {
    case 'A':
      return `
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#2aea73" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
          </g>
        </svg>
      `;
    case 'B':
      return `
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          // <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#e7ea2a" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
          </g>
        </svg>
      `;
    case 'C':
      return `
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#f4b225" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
          </g>
        </svg>
      `;
    case 'D':
      return `
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#f42525" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
          </g>
        </svg>
      `;
    default:
      return `
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#ccc7c7" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
          </g>
        </svg>
      `;
  }
};

const MapScreen = ({ hide, koordinat, allData, pinClickHandle }) => {
  const defaultCenter = [-2.5, 118.0];
  const defaultZoom = 5;

  const getMiddleCoordinate = () => {
    if (koordinat.length === 0) {
      return defaultCenter;
    }
    const middleIndex = Math.floor(koordinat.length / 2);
    return koordinat[middleIndex];
  };

  const extractCoordinates = () => {
    if (Array.isArray(allData)) {
      return allData.map(item => ({
        position: item.coordinate,
        status: item.status_jalan,
        id: item._id
      }));
    }
    return [];
  };

  const coordinatesWithStatus = extractCoordinates();
  const initialCenter = getMiddleCoordinate();
  const initialZoom = koordinat.length > 0 ? 16 : defaultZoom;

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
          <UpdateMapView center={initialCenter} zoom={initialZoom} />
          {coordinatesWithStatus.length > 0 ? (
            coordinatesWithStatus.map((data, index) => (
              <Marker
                key={index}
                position={data.position}
                icon={L.divIcon({
                  className: 'custom-icon',
                  html: `
                    <div style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 40px;
                      height: 40px;
                      filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
                    ">
                      ${getPinColor(data.status)}
                    </div>
                  `,
                  iconSize: [40, 40],
                })}
                eventHandlers={{
                  click: () => {
                    console.log(`Pinpoint clicked at coordinates: ${data.id}`);
                    pinClickHandle(`${data.id}`);
                  },
                }}
              >
                <Popup>
                  <div>
                    <strong>Latitude:</strong> {data.position[0]}<br />
                    <strong>Longitude:</strong> {data.position[1]}<br />
                    <strong>Status:</strong> {data.status}
                  </div>
                </Popup>
              </Marker>
            ))
          ) : (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
              No data available
            </div>
          )}
          <ZoomControl position="bottomleft" />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapScreen;
