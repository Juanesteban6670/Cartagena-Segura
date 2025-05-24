import { useState } from 'react';
import { registro } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registro(form);
    alert(res);
    if (res.includes('✅')) navigate('/');
  };

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">Cartagena Segura</h1>
      <h2 className="mb-4">Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Nombre"
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          required
        />
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
        <button className="btn btn-success w-100" type="submit">
          Registrar
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to="/" style={{ textDecoration: 'none' }}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
