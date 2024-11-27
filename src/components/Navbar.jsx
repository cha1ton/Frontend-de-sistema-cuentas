import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/empresa/clientes">
          Gestión Empresarial
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/empresa/clientes">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empresa/proveedores">
                Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empresa/facturas">
                Facturas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empresa/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-danger ms-auto"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
