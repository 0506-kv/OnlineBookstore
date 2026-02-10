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
import BuyBooks from './Pages/User/BuyBooks';
import BookPage from './Pages/Book/BookPage';
import UserCart from './Pages/User/UserCart';
import UserPayment from './Pages/User/UserPayment';
import UserOrders from './Pages/User/UserOrders';
import SellerHomePage from './Pages/Seller/SellerHomePage';
import SellBooks from './Pages/Seller/SellBooks';
import SellerOrders from './Pages/Seller/SellerOrders';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import AdminControl from './Pages/Admin/AdminControl';
import AdminOrders from './Pages/Admin/AdminOrders';
import NotFoundPage from './Pages/Common/NotFoundPage';
import { Toaster } from 'react-hot-toast';
import SellerProtectedRoute from './Components/Seller/SellerProtectedRoute';
import UserProtectedRoute from './Components/User/UserProtectedRoute';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/seller/register" element={<SellerRegister />} />

        {/* User Routes  */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/home" element={<UserHomePage />} />
          <Route path="/user/buy" element={<BuyBooks />} />
          <Route path="/user/book/:id" element={<BookPage />} />
          <Route path="/user/book" element={<BookPage />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/payment" element={<UserPayment />} />
          <Route path="/user/orders" element={<UserOrders />} />
        </Route>

        {/* Seller Routes */}
        <Route element={<SellerProtectedRoute />}>
          <Route path="/seller/home" element={<SellerHomePage />} />
          <Route path="/seller/sell" element={<SellBooks />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/control" element={<AdminControl />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
