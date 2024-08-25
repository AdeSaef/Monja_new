import React, { useEffect, useRef } from 'react';

const StreetViewMap = ({ lat, lng }) => {
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      const panorama = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat: lat, lng: lng },
          pov: { heading: 100, pitch: 0 },
          zoom: 1,
        }
      );
    }
  }, [lat, lng]);

  return <div ref={streetViewRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default StreetViewMap;
