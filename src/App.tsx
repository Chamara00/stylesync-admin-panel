import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLogin, Layout, Dashboard, Salons, Customers, Services, Settings, SupportChat } from './pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="salons" element={<Salons />} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chat_support" element={<SupportChat />} />
        </Route>
      </Routes>
    </Router>
  );
}
