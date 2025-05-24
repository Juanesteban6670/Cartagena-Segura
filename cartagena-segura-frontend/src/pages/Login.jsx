import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.rol) {
      localStorage.setItem('usuario', JSON.stringify(res));
      if (res.rol === 'ADMIN') navigate('/admin');
      else navigate('/ciudadano');
    } else {
      alert(res);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Cartagena Segura</h1>
      <h2 className="mb-4">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Contraseña"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary w-100 mt-2" type="submit">Ingresar</button>
      </form>
      <div className="mt-3">
        <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
      </div>
    </div>
  );
}
