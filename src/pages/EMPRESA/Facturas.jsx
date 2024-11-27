import React, { useEffect, useState } from "react";
import axios from "axios";

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [filtro, setFiltro] = useState({
    cliente: "",
    proveedor: "",
    estado: "",
  });

  // Fetch de facturas, clientes y proveedores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const [facturasRes, clientesRes, proveedoresRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/facturas/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/clientes/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/proveedores/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setFacturas(facturasRes.data);
        setClientes(clientesRes.data);
        setProveedores(proveedoresRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Manejar el cambio en los filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro((prev) => ({ ...prev, [name]: value }));
  };

  // Filtrar facturas según los filtros seleccionados
  const facturasFiltradas = facturas.filter((factura) => {
    return (
      (!filtro.cliente || factura.cliente === parseInt(filtro.cliente)) &&
      (!filtro.proveedor || factura.proveedor === parseInt(filtro.proveedor)) &&
      (!filtro.estado || factura.estado === filtro.estado)
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Facturas</h1>

      {/* Filtros */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">Filtros</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Cliente</label>
            <select
              name="cliente"
              className="form-select"
              value={filtro.cliente}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Proveedor</label>
            <select
              name="proveedor"
              className="form-select"
              value={filtro.proveedor}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Estado</label>
            <select
              name="estado"
              className="form-select"
              value={filtro.estado}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Vencida">Vencida</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Facturas */}
      <h4 className="mb-3">Lista de Facturas</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Número de Factura</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Proveedor</th>
              <th>Fecha de Emisión</th>
              <th>Fecha de Vencimiento</th>
              <th>Monto Total</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {facturasFiltradas.map((factura, index) => (
              <tr key={factura.id}>
                <td>{index + 1}</td>
                <td>{factura.numero_factura}</td>
                <td>{factura.tipo}</td>
                <td>
                  {clientes.find((cliente) => cliente.id === factura.cliente)
                    ?.nombre || "N/A"}
                </td>
                <td>
                  {proveedores.find(
                    (proveedor) => proveedor.id === factura.proveedor
                  )?.nombre || "N/A"}
                </td>
                <td>{factura.fecha_emision}</td>
                <td>{factura.fecha_vencimiento}</td>
                <td>S/. {Number(factura.monto_total).toFixed(2)}</td>{" "}
                {/* Conversión aquí */}
                <td>{factura.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facturas;
