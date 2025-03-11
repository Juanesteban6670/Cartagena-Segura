import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Íconos personalizados según el tipo de incidente
const icons = {
  robo: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991575.png",
    iconSize: [30, 30],
  }),
  vandalismo: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1047/1047516.png",
    iconSize: [30, 30],
  }),
  asalto: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3523/3523063.png",
    iconSize: [30, 30],
  }),
};

const Mapa = () => {
  const [incidentes, setIncidentes] = useState([
    { 
      id: 1, lat: 10.400, lng: -75.500, 
      tipo: "robo", descripcion: "Robo en el centro", 
      hora: "14:30", estado: "Investigando" 
    },
    { 
      id: 2, lat: 10.405, lng: -75.495, 
      tipo: "vandalismo", descripcion: "Vandalismo en el parque", 
      hora: "16:10", estado: "Resuelto" 
    },
    { 
      id: 3, lat: 10.410, lng: -75.510, 
      tipo: "asalto", descripcion: "Asalto en la avenida", 
      hora: "18:45", estado: "Pendiente" 
    },
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>Cartagena Segura</h1>
      <MapContainer 
        center={[10.4, -75.5]} 
        zoom={12} 
        style={{ height: "500px", width: "60vw", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {incidentes.map((incidente) => (
          <Marker
            key={incidente.id}
            position={[incidente.lat, incidente.lng]}
            icon={icons[incidente.tipo]}
          >
            <Popup>
              <div style={{ textAlign: "left" }}>
                <h3>{incidente.descripcion}</h3>
                <p><b>Hora:</b> {incidente.hora}</p>
                <p><b>Estado:</b> {incidente.estado}</p>
                <p><b>Tipo:</b> {incidente.tipo.charAt(0).toUpperCase() + incidente.tipo.slice(1)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
