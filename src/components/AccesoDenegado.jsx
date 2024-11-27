// src/components/AccesoDenegado.js
import React from "react";
import { Link } from "react-router-dom";

const AccesoDenegado = () => {
  return (
    <div>
      <h2>Acceso Denegado</h2>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/">Ir al Login</Link>
    </div>
  );
};

export default AccesoDenegado;
