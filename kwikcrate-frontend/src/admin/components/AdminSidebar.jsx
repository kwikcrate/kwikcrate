import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
    setIsOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `block py-2 px-4 rounded hover:bg-gray-700 ${
      isActive ? "bg-gray-700 text-green-400" : "text-gray-300"
    }`;

  const pagesDropdown = (
    <div className="ml-4 space-y-1">
      <NavLink to="/admin/pages/privacy-policy" className={linkClass} onClick={() => setIsOpen(false)}>Privacy Policy</NavLink>
      <NavLink to="/admin/pages/terms" className={linkClass} onClick={() => setIsOpen(false)}>Terms & Conditions</NavLink>
      <NavLink to="/admin/pages/returns" className={linkClass} onClick={() => setIsOpen(false)}>Return Policy</NavLink>
      <NavLink to="/admin/pages/help-center" className={linkClass} onClick={() => setIsOpen(false)}>Help Center</NavLink>
      <NavLink to="/admin/pages/complaint" className={linkClass} onClick={() => setIsOpen(false)}>Complaint</NavLink>
      <NavLink to="/admin/pages/faq" className={linkClass} onClick={() => setIsOpen(false)}>FAQ</NavLink>
      <NavLink to="/admin/pages/kyc" className={linkClass} onClick={() => setIsOpen(false)}>KYC</NavLink>
      <NavLink to="/admin/pages/about" className={linkClass} onClick={() => setIsOpen(false)}>About Us</NavLink>
    </div>
  );

  const navLinks = (
    <>
      <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>Dashboard</NavLink>
      <NavLink to="/admin/games" className={linkClass} onClick={() => setIsOpen(false)}>Manage Games</NavLink>
      <NavLink to="/admin/topups" className={linkClass} onClick={() => setIsOpen(false)}>Manage Top-ups</NavLink>
      <NavLink to="/admin/users" className={linkClass} onClick={() => setIsOpen(false)}>Manage Users</NavLink>
      <NavLink to="/admin/queries" className={linkClass} onClick={() => setIsOpen(false)}>User Queries</NavLink>
      <NavLink to="/admin/analytics" className={linkClass} onClick={() => setIsOpen(false)}>Analytics</NavLink>

      {/* 🔽 Pages Dropdown */}
      <div>
        <button
          onClick={() => setPagesOpen(!pagesOpen)}
          className="w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 rounded"
        >
          Pages {pagesOpen ? "▲" : "▼"}
        </button>
        {pagesOpen && pagesDropdown}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 py-2 px-4 text-red-400 hover:bg-gray-700 rounded"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );

  return (
    <>
      {/* 🌐 Mobile Top Header */}
      <div className="md:hidden bg-gray-900 flex items-center justify-between px-4 py-3 border-b border-gray-700 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-green-400">Kwikcrate Admin</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2 border-b border-gray-700 shadow z-10">
          {navLinks}
        </div>
      )}

      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-gray-900 p-6 flex-col space-y-4 h-screen sticky top-0">
        <h2 className="text-2xl font-bold text-green-400 text-center mb-6">Kwikcrate Admin</h2>
        {navLinks}
      </aside>
    </>
  );
}
