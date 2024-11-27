import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Fetch de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/usuarios/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // Manejar eliminación de usuario
  const handleDelete = async (usuarioId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://127.0.0.1:8000/api/usuarios/${usuarioId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Usuario eliminado con éxito");
      setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioId));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  // Manejar redirección para editar usuario
  const handleEdit = (usuarioId) => {
    navigate(`/empresa/usuarios/editar/${usuarioId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestión de Usuarios</h1>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/empresa/registrar-usuario")}
        >
          Crear Usuario
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id}>
              <td>{index + 1}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(usuario.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;
