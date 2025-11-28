import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import DashboardCustomer from './pages/DashboardCustomer';
import DashboardCleaner from './pages/DashboardCleaner';
import AdminDashboard from './pages/AdminDashboard';

function DashboardRouter() {
  const saved = localStorage.getItem("user");
  const user = saved ? JSON.parse(saved) : null;

  if (!user) return <Login />;

  if (user.user_type === "admin") return <AdminDashboard />;
  if (user.user_type === "cleaner") return <DashboardCleaner />;
  return <DashboardCustomer />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />

        <Route path="/dashboard" element={<DashboardRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
