import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate(); // Para redirigir

  // Fetch de proveedores
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/proveedores/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setProveedores(response.data))
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  // Redirigir a agregar proveedor
  const handleAgregar = () => {
    navigate("/empresa/proveedores/agregar");
  };

  // Redirigir a editar proveedor
  const handleEditar = (id) => {
    navigate(`/empresa/proveedores/editar/${id}`);
  };

  // Eliminar proveedor
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/proveedores/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => setProveedores(proveedores.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting provider:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Proveedores</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAgregar}>
          Agregar Proveedor
        </button>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-3">Lista de Proveedores</h4>
          <ul className="list-group">
            {proveedores.map((proveedor) => (
              <li
                key={proveedor.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{proveedor.nombre}</strong>
                  <p className="mb-0">{proveedor.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditar(proveedor.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(proveedor.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
