import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

// EMPRESA
import Login from "./pages/EMPRESA/Login";
import Clientes from "./pages/EMPRESA/Clientes";
import Proveedores from "./pages/EMPRESA/Proveedores";
import Facturas from "./pages/EMPRESA/Facturas";

// COMPONENTES
import Navbar from "./components/Navbar";
import AccesoDenegado from "./components/AccesoDenegado";

import AgregarCliente from "./pages/EMPRESA/AgregarCliente";
import EditarCliente from "./pages/EMPRESA/EditarCliente";

import AgregarProveedor from "./pages/EMPRESA/AgregarProveedor";
import EditarProveedor from "./pages/EMPRESA/EditarProveedor";

import AgregarFactura from "./pages/EMPRESA/AgregarFactura";
import EditarFactura from "./pages/EMPRESA/EditarFactura";

import Dashboard from "./pages/EMPRESA/Dashboard";
import RegistrarUsuario from "./pages/EMPRESA/RegistrarUsuario";

import ListaUsuarios from "./pages/EMPRESA/ListaUsuarios";
import EditarUsuario from "./pages/EMPRESA/EditarUsuario";

import ImportarExportar from "./pages/EMPRESA/ImportarExportar";

// Componente para verificar roles
const RequireRole = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = token ? JSON.parse(atob(token.split(".")[1])).rol : null;

  if (!token || !allowedRoles.includes(userRole)) {
    return <AccesoDenegado />;
  }

  return children;
};

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {/* Mostrar el Navbar solo si el usuario está autenticado */}
      {isAuthenticated && location.pathname !== "/" && (
        <Navbar handleLogout={handleLogout} />
      )}

      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Rutas privadas */}
        <Route
          path="/empresa/clientes"
          element={
            <RequireRole allowedRoles={["Administrador", "Contador"]}>
              <Clientes />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/proveedores"
          element={
            <RequireRole allowedRoles={["Administrador", "Gerente"]}>
              <Proveedores />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/facturas"
          element={
            <RequireRole allowedRoles={["Administrador", "Contador"]}>
              <Facturas />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/clientes/agregar"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <AgregarCliente />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/clientes/editar/:clienteId"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <EditarCliente />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/proveedores/agregar"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <AgregarProveedor />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/proveedores/editar/:proveedorId"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <EditarProveedor />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/facturas/agregar"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <AgregarFactura />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/facturas/editar/:facturaId"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <EditarFactura />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/dashboard"
          element={
            <RequireRole allowedRoles={["Administrador", "Gerente"]}>
              <Dashboard />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/registrar-usuario"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <RegistrarUsuario />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/usuarios"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <ListaUsuarios />
            </RequireRole>
          }
        />
        <Route
          path="/empresa/usuarios/editar/:usuarioId"
          element={
            <RequireRole allowedRoles={["Administrador"]}>
              <EditarUsuario />
            </RequireRole>
          }
        />

        <Route
          path="/empresa/importar-exportar"
          element={<ImportarExportar />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

export default App;
