// src/App.jsx
import { useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import ReporteForm from "./components/ReporteForm";
import ReporteLista from "./components/ReporteLista";
import AdminPanel from "./components/AdminPanel"; // Nuevo componente
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );

  const handleLogin = (usuarioRecibido) => {
    localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));
    setUsuario(usuarioRecibido);
  };

  const cerrarSesion = () => {
    localStorage.clear();
    setUsuario(null);
  };

  if (!usuario) {
    return (
      <div className="app-container">
        <h1>Cartagena Segura 🛡️</h1>
        <Login onLogin={handleLogin} />
        <Registro />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Cartagena Segura 🛡️</h1>
      <button onClick={cerrarSesion} style={{ marginBottom: "1rem" }}>
        Cerrar sesión
      </button>

      {usuario.rol === "CIUDADANO" ? (
        <>
          <ReporteForm />
          <ReporteLista />
        </>
      ) : usuario.rol === "ADMIN" ? (
        <AdminPanel />
      ) : (
        <p>Rol no reconocido: {usuario.rol}</p>
      )}
    </div>
  );
}

export default App;
