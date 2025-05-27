import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';

import RequireAdmin from './commo/RequireAdmin';
import AdminPage from './admin/layouts/AdminPage';
import DashboardPage from './admin/DashboardPage';
import BookAdminPage from './admin/BookAdminPage';
import UserAdminPage from './admin/UserAdminPage';
import CartAdminPage from './admin/CartAdminPage';
import LoginPage from './commo/LoginPage';
import RegisterPage from './commo/RegisterPage';
import HomePage from './components/Homepage/HomePage';
import BookCategoryPage from "./components/book/BookCategoryPage";
import BookDetail from "./components/book/BookDetail";
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import AllBooksPage from "./components/book/AllBooksPage";
import MiniCart from './components/Cart/MiniCart';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from "./components/Cart/CheckoutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventPage from "./components/Events/EventPage";
import EventDetail from "./components/Events/EventDetail";
import EventAdminPage from './admin/EventAdminPage';
import ProfilePage from "./commo/ProfilePage";
import VnpayCallbackPage from "./components/Cart/VnpayCallbackPage"; // đúng path file


function App() {
  const location = useLocation();

  // Xác định có phải admin không
  const isAdminRoute = location.pathname.startsWith('/admin');
  // Xác định có phải trang cart hoặc checkout không
  const isCartOrCheckoutRoute =
    location.pathname === '/cart' ||
    location.pathname === '/checkout';

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      {/* Header chỉ hiện trên user pages */}
      {!isAdminRoute && <Header />}

      {/* MiniCart chỉ hiện khi KHÔNG phải admin và KHÔNG phải /cart hoặc /checkout */}
      {!isAdminRoute && !isCartOrCheckoutRoute && (
        <MiniCart key={location.pathname} />
      )}

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="books" element={<BookAdminPage />} />
            <Route path="users" element={<UserAdminPage />} />
            <Route path="order" element={<CartAdminPage />} />
            <Route path="/admin/events" element={<EventAdminPage />} />
          </Route>

          {/* User */}
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryKey" element={<BookCategoryPage />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/allbooks" element={<AllBooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vnpay_callback" element={<VnpayCallbackPage />} />


        </Routes>
      </main>

      {/* Bottom nav chỉ trên user pages */}
      {!isAdminRoute && <BottomNavigation />}
    </>
  );
}

export default App;
