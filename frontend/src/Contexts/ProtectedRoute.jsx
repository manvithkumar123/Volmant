import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // get role from localStorage

  if (role !== "admin") {
    return <Navigate to="/Login" replace />; // redirect non-admin users
  }

  return children; // allow admin
};

export default ProtectedRoute;
