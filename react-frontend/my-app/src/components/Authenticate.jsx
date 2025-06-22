import React from "react";
import { Navigate } from "react-router-dom";
const Authenticate = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Authenticate;
