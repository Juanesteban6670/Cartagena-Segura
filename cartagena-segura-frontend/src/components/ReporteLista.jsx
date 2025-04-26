import { useEffect, useState } from "react";
import axios from "axios";
import "./ReporteLista.css";

function ReporteLista() {
  const [reportes, setReportes] = useState([]);

  const obtenerReportes = () => {
    axios.get("http://localhost:8081/api/reportes")
      .then(res => setReportes(res.data))
      .catch(err => console.error("Error al obtener reportes:", err));
  };

  const eliminarReporte = (id) => {
    axios.delete(`http://localhost:8081/api/reportes/${id}`)
      .then(() => {
        setReportes(prev => prev.filter(r => r.id !== id));
      })
      .catch(err => console.error("Error al eliminar reporte:", err));
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  return (
    <div className="lista-container">
      <h2>📍 Reportes Registrados</h2>
      {reportes.length === 0 ? (
        <p>No hay reportes por ahora.</p>
      ) : (
        <ul className="lista-reportes">
          {reportes.map(reporte => (
            <li key={reporte.id} className="reporte-item">
              <p><strong>Descripción:</strong> {reporte.descripcion}</p>
              <p><strong>Tipo:</strong> {reporte.tipo}</p>
              <p><strong>ID:</strong> {reporte.id}</p>
              <button className="btn-eliminar" onClick={() => eliminarReporte(reporte.id)}>
                🗑️ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReporteLista;
