import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
export default function HasAuth() {
  const location = useLocation();

  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Outlet />; // Render the protected routes
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}
