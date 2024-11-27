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

import AgregarCliente from "./pages/EMPRESA/AgregarCliente";
import EditarCliente from "./pages/EMPRESA/EditarCliente";

import AgregarProveedor from "./pages/EMPRESA/AgregarProveedor";
import EditarProveedor from "./pages/EMPRESA/EditarProveedor";

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation(); // Mover aquí el useLocation para usarlo en el contexto correcto

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <div>
      {/* Mostrar el Navbar solo si el usuario está autenticado y no está en el login */}
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
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa/proveedores"
          element={
            <PrivateRoute>
              <Proveedores />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa/facturas"
          element={
            <PrivateRoute>
              <Facturas />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa/clientes/agregar"
          element={
            <PrivateRoute>
              <AgregarCliente />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa/clientes/editar/:clienteId"
          element={
            <PrivateRoute>
              <EditarCliente />
            </PrivateRoute>
          }
        />

        <Route
          path="/empresa/proveedores/agregar"
          element={
            <PrivateRoute>
              <AgregarProveedor />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresa/proveedores/editar/:proveedorId"
          element={
            <PrivateRoute>
              <EditarProveedor />
            </PrivateRoute>
          }
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
