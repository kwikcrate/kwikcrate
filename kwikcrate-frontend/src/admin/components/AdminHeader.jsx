// src/components/AdminHeader.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `block py-2 px-4 rounded hover:bg-gray-700 ${
      isActive ? "bg-gray-700 text-green-400" : "text-gray-300"
    }`;

  return (
    <div className="md:hidden bg-gray-900 border-b border-gray-800 shadow-sm">
      {/* Header bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold text-green-400">Kwikcrate Admin</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="bg-gray-800 px-4 py-2 space-y-2 border-t border-gray-700">
          <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/games" className={linkClass} onClick={() => setMenuOpen(false)}>
            Manage Games
          </NavLink>
          <NavLink to="/admin/topups" className={linkClass} onClick={() => setMenuOpen(false)}>
            Manage Top-ups
          </NavLink>
          <NavLink to="/admin/users" className={linkClass} onClick={() => setMenuOpen(false)}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/queries" className={linkClass} onClick={() => setMenuOpen(false)}>
            User Queries
          </NavLink>
          <NavLink to="/admin/analytics" className={linkClass} onClick={() => setMenuOpen(false)}>
            Analytics
          </NavLink>

          {/* Pages Dropdown */}
          <div>
            <button
              onClick={() => setPagesDropdown(!pagesDropdown)}
              className="w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 rounded"
            >
              Pages {pagesDropdown ? "▲" : "▼"}
            </button>
            {pagesDropdown && (
              <div className="ml-4 space-y-1">
                <NavLink to="/admin/pages/privacy-policy" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  Privacy Policy
                </NavLink>
                <NavLink to="/admin/pages/terms" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  Terms & Conditions
                </NavLink>
                <NavLink to="/admin/pages/returns" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  Return Policy
                </NavLink>
                <NavLink to="/admin/pages/help-center" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  Help Center
                </NavLink>
                <NavLink to="/admin/pages/complaint" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  Complaint
                </NavLink>
                <NavLink to="/admin/pages/faq" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  FAQ
                </NavLink>
                <NavLink to="/admin/pages/kyc" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  KYC
                </NavLink>
                <NavLink to="/admin/pages/about" className={linkClass} onClick={() => { setMenuOpen(false); setPagesDropdown(false); }}>
                  About Us
                </NavLink>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 text-red-400 hover:bg-gray-700 rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
