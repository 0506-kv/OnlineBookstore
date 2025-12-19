import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Common/LandingPage';
import LoginPage from './Pages/Common/LoginPage';
import UserLogin from './Pages/User/UserLogin';
import SellerLogin from './Pages/Seller/SellerLogin';
import AdminLogin from './Pages/Admin/AdminLogin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
