import axios from 'axios';
const API = 'http://localhost:8080/api/usuarios';

export const login = async (usuario) => {
  const res = await axios.post(`${API}/login`, usuario);
  return res.data;
};

export const registro = async (usuario) => {
  const res = await axios.post(`${API}/registro`, usuario);
  return res.data;
};
