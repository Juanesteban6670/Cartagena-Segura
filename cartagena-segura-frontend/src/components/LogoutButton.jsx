import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');  // limpia usuario
    localStorage.removeItem('token');    // si usas token
    navigate('/Registro');                   // redirige al login
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout} style={{ float: 'right' }}>
      Cerrar sesión
    </button>
  );
}
