import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./AdminPanel.css";

// Corrección de íconos de Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);
  return null;
};

const AdminPanel = () => {
  const [reportes, setReportes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/reportes");
        const data = await response.json();
        setReportes(data);
      } catch (error) {
        console.error("Error al obtener reportes:", error);
      }
    };
    fetchReportes();
  }, []);

  return (
    <div className="admin-panel-container">
      <h2 className="titulo-neon">Panel de Administrador</h2>
      <div className="panel-content">
        <div className="mapa-container">
          <MapContainer
            center={[10.4236, -75.5253]}
            zoom={12}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reportes.map((reporte) => (
              <Marker
                key={reporte.id}
                position={[reporte.latitud, reporte.longitud]}
              >
                <Popup>
                  <strong>Tipo:</strong> {reporte.tipo} <br />
                  <strong>Estado:</strong> {reporte.estado} <br />
                  <strong>Usuario:</strong> {reporte.usuario} <br />
                  <strong>Descripción:</strong> {reporte.descripcion}
                </Popup>
              </Marker>
            ))}
            {selectedPosition && (
              <>
                <FlyToLocation position={selectedPosition} />
                <Marker position={selectedPosition}>
                  <Popup>Ubicación seleccionada</Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>

        <div className="lista-reportes">
          <h3>Reportes Recientes</h3>
          <div className="scroll-area">
            {reportes.map((reporte) => (
              <div key={reporte.id} className="reporte-item">
                <p><strong>Tipo:</strong> {reporte.tipo}</p>
                <p><strong>Estado:</strong> {reporte.estado}</p>
                <p><strong>Usuario:</strong> {reporte.usuario}</p>
                <p><strong>Descripción:</strong> {reporte.descripcion}</p>
                <button
                  onClick={() => setSelectedPosition([reporte.latitud, reporte.longitud])}
                >
                  Ver en el mapa
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
