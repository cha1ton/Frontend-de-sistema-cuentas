import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarCliente = () => {
  const { clienteId } = useParams(); // Obtener el ID del cliente desde la URL
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  // Obtener los datos del cliente
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/clientes/${clienteId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const cliente = response.data;
        setNombre(cliente.nombre);
        setEmail(cliente.email);
        setTelefono(cliente.telefono);
        setDireccion(cliente.direccion);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchCliente();
  }, [clienteId]);

  // Manejar la actualización del cliente
  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/clientes/${clienteId}/`,
        { nombre, email, telefono, direccion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("Cliente actualizado correctamente");
      navigate("/empresa/clientes"); // Redirigir a la lista de clientes
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      alert("Ocurrió un error al actualizar el cliente");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Cliente</h2>
      <form onSubmit={handleGuardarCambios} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
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
        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarCliente;
