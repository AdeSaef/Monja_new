import React from 'react';
import StreetViewMap from './maps';

const App = () => {
  return (
    <div>
      <h1>Street View Example</h1>
      <StreetViewMap lat={-6.1751} lng={106.8650} /> {/* Koordinat untuk Jakarta */}
    </div>
  );
};

export default App;
