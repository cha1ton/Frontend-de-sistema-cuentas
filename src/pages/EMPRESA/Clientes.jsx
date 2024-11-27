import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  // Obtener la lista de clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clientes/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  // Manejar el clic en "Editar"
  const handleEditar = (clienteId) => {
    navigate(`/empresa/clientes/editar/${clienteId}`); // Redirige a la página de edición con el ID del cliente
  };

  // Manejar el clic en "Agregar Cliente"
  const handleAgregarCliente = () => {
    navigate(`/empresa/clientes/agregar`); // Redirige a la página de agregar cliente
  };

  // Manejar la eliminación de un cliente
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        alert("Cliente eliminado correctamente");
        setClientes(clientes.filter((cliente) => cliente.id !== id)); // Actualizar la lista local
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        alert("Ocurrió un error al eliminar el cliente");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Clientes</h2>

      {/* Botón para agregar cliente */}
      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={handleAgregarCliente}
        >
          Agregar Cliente
        </button>
      </div>

      {/* Lista de clientes */}
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {clientes.map((cliente) => (
              <li
                key={cliente.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{cliente.nombre}</strong>
                  <p className="mb-0">{cliente.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditar(cliente.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(cliente.id)}
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

export default Clientes;
