import './Auth.css';
import { useState } from "react";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre,
      email,
      password,
    };

    try {
      const respuesta = await fetch("http://localhost:8081/api/usuarios/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      const resultado = await respuesta.text();
      setMensaje(resultado);
    } catch (error) {
      console.error("Error al registrarse:", error);
      setMensaje("Error de conexión ❌");
    }
  };

  return (
    <div>
      <h2>Registro de Ciudadano</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Registro;
