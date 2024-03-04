"use client"

import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDXpvu0uQUXL-44EFQZXUYDQugvNCQatT4"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={13}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;

