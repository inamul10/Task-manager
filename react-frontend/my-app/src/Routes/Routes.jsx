// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Authenticate from "../components/Authenticate";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <Authenticate>
            <Home />
          </Authenticate>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
