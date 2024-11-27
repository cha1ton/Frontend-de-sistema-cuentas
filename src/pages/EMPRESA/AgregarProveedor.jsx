import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgregarProveedor = () => {
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", direccion: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/proveedores/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => {
        alert("Proveedor agregado con éxito");
        navigate("/empresa/proveedores");
      })
      .catch((error) => console.error("Error al agregar proveedor:", error));
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Proveedor</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar Proveedor
        </button>
      </form>
    </div>
  );
};

export default AgregarProveedor;
