import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Importar la librería xlsx
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Importar el complemento autoTable

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

  // Exportar datos a Excel
  const exportToExcel = () => {
    const data = facturas.map((factura) => {
      const cliente = clientes.find((cli) => cli.id === factura.cliente)?.nombre || "N/A";
      const proveedor = proveedores.find((prov) => prov.id === factura.proveedor)?.nombre || "N/A";
      return {
        "Número de Factura": factura.numero_factura,
        Tipo: factura.tipo,
        Cliente: cliente,
        Proveedor: proveedor,
        "Fecha de Emisión": factura.fecha_emision,
        "Fecha de Vencimiento": factura.fecha_vencimiento,
        "Monto Total": `S/. ${Number(factura.monto_total).toFixed(2)}`,
        Estado: factura.estado,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Facturas");

    XLSX.writeFile(wb, "facturas.xlsx");
  };

  // Exportar datos a PDF usando jsPDF y autoTable
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Facturas", 14, 20);  // Título en PDF

    // Crear la tabla en el PDF con autoTable
    const headers = ["#", "Número de Factura", "Tipo", "Cliente", "Proveedor", "Fecha de Emisión", "Fecha de Vencimiento", "Monto Total", "Estado"];
    const rows = facturas.map((factura, index) => {
      const cliente = clientes.find((cli) => cli.id === factura.cliente)?.nombre || "N/A";
      const proveedor = proveedores.find((prov) => prov.id === factura.proveedor)?.nombre || "N/A";
      return [
        index + 1,
        factura.numero_factura,
        factura.tipo,
        cliente,
        proveedor,
        factura.fecha_emision,
        factura.fecha_vencimiento,
        `S/. ${Number(factura.monto_total).toFixed(2)}`,
        factura.estado,
      ];
    });

    // Usar autoTable para crear la tabla en el PDF
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30, // Empieza la tabla debajo del título
    });

    // Guardar el archivo PDF
    doc.save("facturas.pdf");
  };

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

      {/* Botones para exportar */}
      <div className="mb-4">
        <button className="btn btn-success" onClick={exportToExcel}>
          Exportar a Excel
        </button>
        <button className="btn btn-primary ms-3" onClick={exportToPDF}>
          Exportar a PDF
        </button>
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
                <td>S/. {Number(factura.monto_total).toFixed(2)}</td>
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
