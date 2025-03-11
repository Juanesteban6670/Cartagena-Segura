import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
    return (
        <MapContainer 
            center={[10.4, -75.5]} 
            zoom={12} 
            style={{ 
                height: "600px", 
                width: "90%", 
                maxWidth: "1200px", 
                borderRadius: "10px", 
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)" 
            }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
};

export default Mapa;
