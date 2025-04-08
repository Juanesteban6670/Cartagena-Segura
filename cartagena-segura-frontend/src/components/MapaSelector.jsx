import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapaSelector.css";

// Icono personalizado para el marcador
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} icon={icon} />;
}

function MapaSelector({ onUbicacionSeleccionada }) {
  return (
    <div className="mapa-container">
      <h3>Selecciona la ubicación del incidente:</h3>
      <MapContainer center={[10.4, -75.5]} zoom={13} scrollWheelZoom={true} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <LocationMarker onSelect={onUbicacionSeleccionada} />
      </MapContainer>
    </div>
  );
}

export default MapaSelector;
