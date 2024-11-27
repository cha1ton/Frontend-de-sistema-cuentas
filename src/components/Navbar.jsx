import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ handleLogout }) => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/usuario/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUsuario();
  }, []);

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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/empresa/clientes")}
              >
                Clientes
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/empresa/proveedores")}
              >
                Proveedores
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/empresa/facturas")}
              >
                Facturas
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/empresa/usuarios")}
              >
                Usuarios
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/empresa/dashboard")}
              >
                Dashboard
              </button>
            </li>
          </ul>
          <span className="navbar-text me-3">
            {usuario ? `Hola, ${usuario.username}` : "Cargando..."}
          </span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
