import './Auth.css';
import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const credenciales = {
      email,
      password,
    };

    try {
      const respuesta = await fetch("http://localhost:8081/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      });

      const data = await respuesta.json();

      if (typeof data === "string") {
        setMensaje(data);
      } else {
        setMensaje("Inicio de sesión exitoso ✅");
        onLogin(data);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Error de conexión ❌");
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
