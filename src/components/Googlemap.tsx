"use client"

import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const mapContainerStyle = {
    height: '50vh',
    width: '100%',
  };
  const gmap_api = process.env.GOOGLE_MAP_API_KEY

  return (
    <LoadScript
      googleMapsApiKey={gmap_api!}
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

