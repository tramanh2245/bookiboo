// src/components/Auth/RequireAdmin.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Đúng path tới useAuth của bạn

const RequireAdmin = ({ children }) => {
  const { auth } = useAuth();
  const user = auth?.user;
  const location = useLocation();

  // Nếu chưa có user hoặc không phải admin thì redirect về login
  if (!user?.role || user.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Nếu đúng là admin thì render children (tức là giao diện admin/dashboard)
  return children;
};

export default RequireAdmin;
