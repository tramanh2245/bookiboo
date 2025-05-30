import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <style>
        {`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f9; }
        .container { display: flex; min-height: 100vh; }
        aside { width: 256px; background-color: #1f2937; color: #fff; padding: 1rem; flex-shrink: 0; }
        aside h1 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        nav { display: flex; flex-direction: column; gap: 1rem; }
        nav a { color: #d1d5db; text-decoration: none; padding: 0.5rem; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem; transition: color 0.2s, background-color 0.2s; }
        nav a:hover { color: #fde047; background-color: #374151; }
        nav a.active { color: #fde047; font-weight: 600; background-color: #374151; }
        main { flex: 1; background-color: #f3f4f6; padding: 1.5rem; }
        @media (max-width: 768px) {
          .container { flex-direction: column; }
          aside { width: 100%; padding: 1rem; }
          aside h1 { font-size: 1.25rem; }
          nav a { padding: 0.4rem; font-size: 0.875rem; }
          main { padding: 1rem; }
        }
        @media (max-width: 480px) {
          aside { padding: 0.75rem; }
          nav { gap: 0.5rem; }
          nav a { padding: 0.3rem; font-size: 0.8125rem; }
          main { padding: 0.75rem; }
        }
        `}
      </style>
      <div className="container">
        {/* Sidebar */}
        <aside>
          <h1>📚 Admin Panel</h1>
          <nav>
            {/* Quay về trang chủ */}
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              🏠 Trang chủ
            </NavLink>
            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/admin/books" className={({ isActive }) => (isActive ? 'active' : '')}>
              📘 Quản lý Sách
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              👤 Quản lý Người dùng
            </NavLink>
            <NavLink to="/admin/order" className={({ isActive }) => (isActive ? 'active' : '')}>
              🛒 Quản lý đơn hàng
            </NavLink>
            <NavLink to="/admin/events" className={({ isActive }) => (isActive ? 'active' : '')}>
              📅 Quản lý Sự kiện
            </NavLink>
          </nav>
        </aside>
        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
