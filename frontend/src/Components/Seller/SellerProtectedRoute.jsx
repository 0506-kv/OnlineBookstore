import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const SellerProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const seller = localStorage.getItem('seller');

  if (!token || !seller) {
    return <Navigate to="/seller/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default SellerProtectedRoute;
