import { useState } from "react";
import axios from "axios";
import MapaSelector from "./MapaSelector";
import "./ReporteForm.css";

function ReporteForm() {
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("Robo");
  const [ubicacion, setUbicacion] = useState(null);

  const enviarReporte = async (e) => {
    e.preventDefault();

    if (!ubicacion) {
      alert("Selecciona una ubicación en el mapa 🗺️");
      return;
    }

    const usuario = localStorage.getItem("usuario"); // 👈 obtenemos el usuario

    const nuevoReporte = {
      descripcion,
      tipo,
      estado: "Pendiente",
      fecha: new Date().toISOString(),
      latitud: ubicacion.lat,
      longitud: ubicacion.lng,
      usuario, // 👈 lo agregamos al reporte
    };

    try {
      const response = await axios.post("http://localhost:8081/api/reportes", nuevoReporte);
      alert("Reporte enviado con éxito ✅");
      setDescripcion("");
      setTipo("Robo");
      setUbicacion(null);
      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar el reporte:", error);
      alert("Error al enviar el reporte ❌");
    }
  };

  return (
    <div className="formulario">
      <h2>Reportar incidente</h2>
      <form onSubmit={enviarReporte}>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Tipo de incidente:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccione un tipo</option>
          <option value="Robo">Robo</option>
          <option value="Asalto">Asalto</option>
          <option value="Vandalismo">Vandalismo</option>
          <option value="Violencia doméstica">Violencia doméstica</option>
          <option value="Venta de drogas">Venta de drogas</option>
          <option value="Tiroteo">Tiroteo</option>
          <option value="Acoso">Acoso</option>
          <option value="Intimidación">Intimidación</option>
          <option value="Desorden público">Desorden público</option>
          <option value="Accidente de tránsito">Accidente de tránsito</option>
          <option value="Sospecha de actividad criminal">Sospecha de actividad criminal</option>
          <option value="Ruido excesivo">Ruido excesivo</option>
          <option value="Otro">Otro</option>
        </select>

        <MapaSelector onUbicacionSeleccionada={setUbicacion} />

        <button type="submit">Enviar Reporte</button>
      </form>
    </div>
  );
}

export default ReporteForm;
