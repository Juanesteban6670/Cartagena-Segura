import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

function LocationMarker({ onLocationSelected }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelected(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapaCiudadano({ onLocationSelected }) {
  return (
    <MapContainer center={[10.4, -75.5]} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onLocationSelected={onLocationSelected} />
    </MapContainer>
  );
}
