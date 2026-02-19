import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UserProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/user/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
