import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const tokenExist = () => {
    const token = localStorage.getItem("token");
    return token !== "";
  };

  if (tokenExist()) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;