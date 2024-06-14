import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import "react-toastify/dist/ReactToastify.css";
import HasAuth from "hook/HasAuth";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route element={<HasAuth />}>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
      </Route>
    </Routes>
  );
};

export default App;
