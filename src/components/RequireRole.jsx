import React from "react";
import { Navigate } from "react-router-dom";

const RequireRole = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = token ? JSON.parse(atob(token.split(".")[1])).rol : null;

  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireRole;
