import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarUsuario = () => {
  const { usuarioId } = useParams(); // Obtiene el ID del usuario desde la URL
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    rol: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/usuarios/${usuarioId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData({
          username: response.data.username,
          email: response.data.email,
          rol: response.data.rol,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error al cargar los datos del usuario.");
      }
    };
    fetchUsuario();
  }, [usuarioId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://127.0.0.1:8000/api/usuarios/${usuarioId}/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Usuario actualizado con éxito");
      navigate("/empresa/usuarios"); // Redirige a la lista de usuarios
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Hubo un error al actualizar el usuario.");
    }
  };

  if (loading) {
    return <div className="container mt-5">Cargando datos...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Editar Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            name="rol"
            className="form-select"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Contador">Contador</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
