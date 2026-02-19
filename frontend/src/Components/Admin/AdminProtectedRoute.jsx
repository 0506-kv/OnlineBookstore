import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
        return <Navigate to="/seller/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
