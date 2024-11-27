import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarFactura = () => {
  const { facturaId } = useParams(); // Obtener el ID de la factura desde la URL
  const [formData, setFormData] = useState({
    numero_factura: "",
    tipo: "Cobrar",
    cliente: "",
    proveedor: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    monto_total: "",
    estado: "Pendiente",
  });
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();

  // Fetch de datos iniciales de clientes, proveedores y factura
  useEffect(() => {
    // Obtener clientes
    axios
      .get("http://127.0.0.1:8000/api/clientes/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Error fetching clients:", error));

    // Obtener proveedores
    axios
      .get("http://127.0.0.1:8000/api/proveedores/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setProveedores(response.data))
      .catch((error) => console.error("Error fetching providers:", error));

    // Obtener datos de la factura
    axios
      .get(`http://127.0.0.1:8000/api/facturas/${facturaId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching invoice:", error));
  }, [facturaId]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/facturas/${facturaId}/`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => {
        alert("Factura actualizada exitosamente.");
        navigate("/empresa/facturas");
      })
      .catch((error) => console.error("Error updating invoice:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Editar Factura</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Número de Factura</label>
          <input
            type="text"
            className="form-control"
            value={formData.numero_factura}
            onChange={(e) => setFormData({ ...formData, numero_factura: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          >
            <option value="Cobrar">Cobrar</option>
            <option value="Pagar">Pagar</option>
          </select>
        </div>
        {formData.tipo === "Cobrar" && (
          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.tipo === "Pagar" && (
          <div className="mb-3">
            <label className="form-label">Proveedor</label>
            <select
              className="form-select"
              value={formData.proveedor}
              onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
            >
              <option value="">Seleccionar Proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Fecha de Emisión</label>
          <input
            type="date"
            className="form-control"
            value={formData.fecha_emision}
            onChange={(e) => setFormData({ ...formData, fecha_emision: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Vencimiento</label>
          <input
            type="date"
            className="form-control"
            value={formData.fecha_vencimiento}
            onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Monto Total</label>
          <input
            type="number"
            className="form-control"
            value={formData.monto_total}
            onChange={(e) => setFormData({ ...formData, monto_total: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Pagada">Pagada</option>
            <option value="Vencida">Vencida</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarFactura;
