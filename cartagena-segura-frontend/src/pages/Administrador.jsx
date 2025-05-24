import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaAdministrador from '../components/MapaAdministrador';
import axios from 'axios';
import ReporteCard from '../components/ReporteCard';
import { cambiarEstado } from '../services/reporteService';
import ThemeToggle from '../components/ThemeToggle';

export default function Administrador() {
  const navigate = useNavigate();
  const [reportes, setReportes] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [total, setTotal] = useState(0);

  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenFechaDesc, setOrdenFechaDesc] = useState(true);

  const fetchReportes = () => {
    axios.get(`http://localhost:8080/api/reportes?page=${page}&size=${size}`)
      .then((res) => {
        setReportes(res.data.content || []);
        setTotal(res.data.totalElements || 0);
      })
      .catch(() => {
        setReportes([]);
        setTotal(0);
      });
  };

  useEffect(() => {
    fetchReportes();
    const interval = setInterval(fetchReportes, 5000);
    return () => clearInterval(interval);
  }, [page]);

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await cambiarEstado(id, nuevoEstado);
      fetchReportes();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/Registro');
  };

  // Filtro y orden local
  const reportesFiltradosOrdenados = reportes
    .filter(r => (filtroTipo ? r.tipo === filtroTipo : true))
    .sort((a, b) => {
      const fechaA = new Date(a.fechaHora);
      const fechaB = new Date(b.fechaHora);
      return ordenFechaDesc ? fechaB - fechaA : fechaA - fechaB;
    });

  const totalPages = Math.ceil(total / size);

  return (
    <div className="container mt-4">
      {/* Aquí agregamos el iframe del dashboard Power BI */}
      <div className="mb-4" style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
        <iframe 
          title="juancho"
          width="100%" 
          height="450" 
          src="https://app.powerbi.com/view?r=eyJrIjoiNWY5ZWU2YzgtNDRmYS00OGU1LTllZTAtOWJhOWM1YTk0NTdhIiwidCI6IjlkMTJiZjNmLWU0ZjYtNDdhYi05MTJmLTFhMmYwZmM0OGFhNCIsImMiOjR9" 
          frameBorder="0" 
          allowFullScreen={true}
        ></iframe>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Panel Administrador</h2>
        <div className="d-flex gap-3 align-items-center">
          <ThemeToggle />
          <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-3 d-flex gap-3 align-items-center">
        <select
          className="form-select"
          value={filtroTipo}
          onChange={(e) => {
            setFiltroTipo(e.target.value);
            setPage(0);
          }}
          style={{ width: '250px' }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Robo">Robo</option>
          <option value="Violencia">Violencia</option>
          <option value="Accidente de tránsito">Accidente de tránsito</option>
          <option value="Emergencia médica">Emergencia médica</option>
          <option value="Otro">Otro</option>
        </select>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setOrdenFechaDesc(!ordenFechaDesc);
            setPage(0);
          }}
        >
          Ordenar por fecha: {ordenFechaDesc ? 'Más recientes' : 'Más antiguos'}
        </button>
      </div>

      <MapaAdministrador reportes={reportesFiltradosOrdenados} />

      <div className="mt-4">
        <h4>Reportes recibidos</h4>
        {reportesFiltradosOrdenados.length === 0 ? (
          <p>No hay reportes para mostrar.</p>
        ) : (
          reportesFiltradosOrdenados.map((r) => (
            <ReporteCard key={r.id || r._id} reporte={r} onCambiarEstado={handleEstadoChange} />
          ))
        )}

        {/* Paginación */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Anterior
          </button>
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => setPage(p => (p + 1 < totalPages ? p + 1 : p))}
            disabled={page + 1 >= totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
