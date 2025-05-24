import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapaAdministrador({ reportes }) {
  return (
    <MapContainer center={[10.4, -75.5]} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {reportes.map((r) => (
        <Marker key={r.id} position={[r.latitud, r.longitud]}>
          <Popup>
            <b>{r.tipo}</b><br />
            {r.descripcion}<br />
            Estado: {r.estado}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
