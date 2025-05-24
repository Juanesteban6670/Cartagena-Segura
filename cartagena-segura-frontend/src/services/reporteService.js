import axios from 'axios';
const API = 'http://localhost:8080/api/reportes';

export const crearReporte = async (reporte) => {
  const res = await axios.post(API, reporte);
  return res.data;
};

export const cambiarEstado = async (id, nuevoEstado) => {
  const { data } = await axios.get(`${API}/${id}`);
  const actualizado = { ...data, estado: nuevoEstado };
  await axios.put(`${API}/${id}`, actualizado);
};
