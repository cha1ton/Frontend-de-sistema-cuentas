import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgregarFactura = () => {
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

  // Fetch de clientes y proveedores
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clientes/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Error fetching clients:", error));

    axios
      .get("http://127.0.0.1:8000/api/proveedores/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => setProveedores(response.data))
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/facturas/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => {
        alert("Factura agregada exitosamente.");
        navigate("/empresa/facturas");
      })
      .catch((error) => console.error("Error adding invoice:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Agregar Factura</h1>
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
        <button type="submit" className="btn btn-primary w-100">
          Agregar Factura
        </button>
      </form>
    </div>
  );
};

export default AgregarFactura;
