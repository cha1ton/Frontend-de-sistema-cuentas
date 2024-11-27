import React, { useState } from "react";
import axios from "axios";

const RegistrarUsuario = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Recuperar el token
      const response = await axios.post(
        "http://127.0.0.1:8000/api/registro/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agregar el token aquí
          },
        }
      );
      setMessage("Usuario registrado con éxito");
      setFormData({ username: "", email: "", password: "", rol: "" });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMessage("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Registrar Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            placeholder="Ingrese el nombre de usuario"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Ingrese el correo electrónico"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Ingrese la contraseña"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            className="form-select"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Contador">Contador</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default RegistrarUsuario;
