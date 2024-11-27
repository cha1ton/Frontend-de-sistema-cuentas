import React, { useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ImportarExportar = ({ facturas = [], clientes = [], proveedores = [] }) => { // Inicializamos los props como arrays vacíos
  const [file, setFile] = useState(null);

  // Importar CSV o Excel
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImportCSV = () => {
    if (!file) return alert("Por favor, selecciona un archivo CSV.");

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData); // Aquí procesarías los datos importados
    };
    reader.readAsBinaryString(file);
  };

  const handleImportExcel = () => {
    if (!file) return alert("Por favor, selecciona un archivo Excel.");

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData); // Aquí procesarías los datos importados
    };
    reader.readAsBinaryString(file);
  };

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["#","Factura","Cliente","Proveedor","Monto"]],
      body: facturas.map((factura, index) => [
        index + 1,
        factura.numero_factura,
        factura.cliente,
        factura.proveedor,
        factura.monto_total
      ])
    });
    doc.save("facturas.pdf");
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const data = facturas.map((factura) => {
      return {
        "Factura": factura.numero_factura,
        "Cliente": factura.cliente,
        "Proveedor": factura.proveedor,
        "Monto": factura.monto_total
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Facturas");
    XLSX.writeFile(wb, "facturas.xlsx");
  };

  return (
    <div>
      <h3>Importar y Exportar Facturas</h3>
      
      {/* Botones de Importación */}
      <div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="form-control mb-3"
        />
        <button onClick={handleImportCSV} className="btn btn-success me-2">
          Importar desde CSV
        </button>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="form-control mb-3"
        />
        <button onClick={handleImportExcel} className="btn btn-secondary">
          Importar desde Excel
        </button>
      </div>

      {/* Botones de Exportación */}
      <div className="mt-3">
        <button onClick={exportToExcel} className="btn btn-primary me-2">
          Exportar a Excel
        </button>
        <button onClick={exportToPDF} className="btn btn-danger">
          Exportar a PDF
        </button>
      </div>

      {/* Mostrar los datos importados */}
      {facturas && facturas.length > 0 ? (
        <div className="mt-4">
          <h4>Facturas Importadas</h4>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Número de Factura</th>
                <th>Cliente</th>
                <th>Proveedor</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{factura.numero_factura}</td>
                  <td>{factura.cliente}</td>
                  <td>{factura.proveedor}</td>
                  <td>{factura.monto_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay facturas para mostrar.</p>
      )}
    </div>
  );
};

export default ImportarExportar;
