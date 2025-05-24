import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaCiudadano from '../components/MapaCiudadano';
import { crearReporte } from '../services/reporteService';
import ThemeToggle from '../components/ThemeToggle';

export default function Ciudadano() {
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState(null);
  const [form, setForm] = useState({ tipo: '', descripcion: '', estado: 'Pendiente' });
  const [usuarioEmail, setUsuarioEmail] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setUsuarioEmail(usuario.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ubicacion) return alert("Selecciona una ubicación en el mapa");

    const reporte = {
      ...form,
      usuario: usuarioEmail,
      latitud: ubicacion.lat,
      longitud: ubicacion.lng,
      fechaHora: new Date(),
    };

    await crearReporte(reporte);
    alert("Reporte enviado ✅");
    setForm({ tipo: '', descripcion: '', estado: 'Pendiente' });
    setUbicacion(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/Registro');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Crear Reporte</h2>
        <div className="d-flex gap-3 align-items-center">
          <ThemeToggle />
          <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <MapaCiudadano onLocationSelected={setUbicacion} />

      <form onSubmit={handleSubmit} className="mt-3 p-4 bg-light rounded shadow">
        <div className="mb-3">
          <label className="form-label">Tipo de incidente</label>
          <select
            className="form-select"
            value={form.tipo}
            onChange={e => setForm({ ...form, tipo: e.target.value })}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Robo">Robo</option>
            <option value="Violencia">Violencia</option>
            <option value="Accidente de tránsito">Accidente de tránsito</option>
            <option value="Emergencia médica">Emergencia médica</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tu correo</label>
          <input className="form-control" type="email" value={usuarioEmail} disabled />
        </div>

        <button className="btn btn-primary" type="submit">Enviar Reporte</button>
      </form>
    </div>
  );
}
