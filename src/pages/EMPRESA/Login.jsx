import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      // Guarda tokens en localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Guarda el rol del usuario en localStorage
      localStorage.setItem("userRole", response.data.role); // Asegúrate de que el backend incluya `role` en la respuesta del token.

      // Actualiza el estado de autenticación
      setIsAuthenticated(true);

      // Redirige a la página principal de la empresa
      navigate("/empresa/clientes");
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Credenciales incorrectas, intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión - Empresa</h2>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
