export default function ReporteCard({ reporte, onCambiarEstado }) {
  const estados = ['Pendiente', 'En proceso', 'Atendido'];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{reporte.tipo}</h5>
        <p className="card-text">{reporte.descripcion}</p>
        <p className="card-text"><small>Estado actual: {reporte.estado}</small></p>
        <select
          className="form-select"
          value={reporte.estado}
          onChange={(e) => onCambiarEstado(reporte.id, e.target.value)}
        >
          {estados.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
