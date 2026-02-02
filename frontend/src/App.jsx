import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Common/LandingPage';
import LoginPage from './Pages/Common/LoginPage';
import UserLogin from './Pages/User/UserLogin';
import SellerLogin from './Pages/Seller/SellerLogin';
import RegisterPage from './Pages/Common/RegisterPage';
import UserRegister from './Pages/User/UserRegister';
import SellerRegister from './Pages/Seller/SellerRegister';
import UserHomePage from './Pages/User/UserHomePage';
import SellerHomePage from './Pages/Seller/SellerHomePage';
import SellBooks from './Components/Seller/SellBooks';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import AdminControl from './Pages/Admin/AdminControl';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/seller/register" element={<SellerRegister />} />

      {/* User Routes  */}
      <Route path="/user/home" element={<UserHomePage />} />

      {/* Seller Routes */}
      <Route path="/seller/home" element={<SellerHomePage />} />
      <Route path="/seller/my-books" element={<SellBooks />} />

      {/* Admin Routes */}
      <Route path="/admin/control" element={<AdminControl />} />
      <Route path="/admin/home" element={<AdminHomePage />} />
    </Routes>
  );
};

export default App;
