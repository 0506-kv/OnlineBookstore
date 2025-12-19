import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Common/LandingPage';
import LoginPage from './Pages/Common/LoginPage';
import UserLogin from './Pages/User/UserLogin';
import SellerLogin from './Pages/Seller/SellerLogin';
import AdminLogin from './Pages/Admin/AdminLogin';
import RegisterPage from './Pages/Common/RegisterPage';
import UserRegister from './Pages/User/UserRegister';
import SellerRegister from './Pages/Seller/SellerRegister';
import AdminRegister from './Pages/Admin/AdminRegister';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/seller/register" element={<SellerRegister />} />
      <Route path="/admin/register" element={<AdminRegister />} />
    </Routes>
  );
};

export default App;
