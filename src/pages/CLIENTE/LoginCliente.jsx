import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCliente = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar mensajes de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simula autenticación del cliente
      const userRole = "CLIENTE"; // Cambia esto por lógica del backend
      localStorage.setItem("accessToken", "dummyClientToken");
      localStorage.setItem("userRole", userRole);

      // Actualizar estado de autenticación
      setIsAuthenticated(true);

      // Redirigir al portal de productos
      navigate("/cliente/productos");
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión - Cliente</h2>
      <form onSubmit={handleLogin} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
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

export default LoginCliente;
