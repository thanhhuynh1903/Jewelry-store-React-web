import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
<<<<<<< HEAD
import Home from "../src/components/homepage/Home";
=======
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> f885bfedbb599130cba9963461f045dc84f30186

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
};

export default App;
