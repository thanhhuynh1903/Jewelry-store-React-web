import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import "react-toastify/dist/ReactToastify.css";
import HasAuth from "hook/HasAuth";
import GoogleCallback from "hook/GoogleCallback";
import Home from "../src/components/homepage/Home";
import ProductDetail from "components/products/ProductDetail";
import Cart from "components/cart/Cart";
import Checkout from "components/checkout/Checkout";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/authGoogle" element={<GoogleCallback />} /> {/* Thêm route callback */}
      <Route element={<HasAuth />}>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="home/*" element={<Home/>} />
      </Route>
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
