import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgregarCliente = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  const handleAgregarCliente = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/clientes/",
        { nombre, email, telefono, direccion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("Cliente agregado correctamente");
      navigate("/empresa/clientes"); // Redirigir a la lista de clientes
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("Ocurrió un error al agregar el cliente");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Cliente</h2>
      <form
        onSubmit={handleAgregarCliente}
        className="card p-4 shadow-sm mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Agregar Cliente
        </button>
      </form>
    </div>
  );
};

export default AgregarCliente;
