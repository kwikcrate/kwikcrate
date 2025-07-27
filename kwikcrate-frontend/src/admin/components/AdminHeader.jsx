import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({
    pages: false,
    homepage: false,
  });

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

  const handleDropdownToggle = (section) => {
    setDropdownState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCloseMenus = () => {
    setMenuOpen(false);
    setDropdownState({ pages: false, homepage: false });
  };

  return (
    <div className="md:hidden bg-gray-900 border-b border-gray-800 shadow-sm">
      {/* Header Bar */}
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold text-green-400">Kwikcrate Admin</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Navigation */}
      {menuOpen && (
        <div className="bg-gray-800 px-4 py-2 space-y-2 border-t border-gray-700">
          <NavLink to="/admin/dashboard" className={linkClass} onClick={handleCloseMenus}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/games" className={linkClass} onClick={handleCloseMenus}>
            Manage Games
          </NavLink>
          <NavLink to="/admin/topups" className={linkClass} onClick={handleCloseMenus}>
            Manage Top-ups
          </NavLink>
          <NavLink to="/admin/users" className={linkClass} onClick={handleCloseMenus}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/queries" className={linkClass} onClick={handleCloseMenus}>
            User Queries
          </NavLink>
          <NavLink to="/admin/analytics" className={linkClass} onClick={handleCloseMenus}>
            Analytics
          </NavLink>

          {/* Pages Dropdown */}
          <div>
            <button
              onClick={() => handleDropdownToggle("pages")}
              className="w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 rounded"
            >
              Pages {dropdownState.pages ? "▲" : "▼"}
            </button>
            {dropdownState.pages && (
              <div className="ml-4 space-y-1">
                <NavLink to="/admin/pages/privacy-policy" className={linkClass} onClick={handleCloseMenus}>
                  Privacy Policy
                </NavLink>
                <NavLink to="/admin/pages/terms" className={linkClass} onClick={handleCloseMenus}>
                  Terms & Conditions
                </NavLink>
                <NavLink to="/admin/pages/returns" className={linkClass} onClick={handleCloseMenus}>
                  Return Policy
                </NavLink>
                <NavLink to="/admin/pages/help-center" className={linkClass} onClick={handleCloseMenus}>
                  Help Center
                </NavLink>
                <NavLink to="/admin/pages/complaint" className={linkClass} onClick={handleCloseMenus}>
                  Complaint
                </NavLink>
                <NavLink to="/admin/pages/faq" className={linkClass} onClick={handleCloseMenus}>
                  FAQ
                </NavLink>
                <NavLink to="/admin/pages/kyc" className={linkClass} onClick={handleCloseMenus}>
                  KYC
                </NavLink>
                <NavLink to="/admin/pages/about" className={linkClass} onClick={handleCloseMenus}>
                  About Us
                </NavLink>
              </div>
            )}
          </div>

          {/* Homepage Dropdown */}
          <div>
            <button
              onClick={() => handleDropdownToggle("homepage")}
              className="w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 rounded"
            >
              Homepage {dropdownState.homepage ? "▲" : "▼"}
            </button>
            {dropdownState.homepage && (
              <div className="ml-4 space-y-1">
                <NavLink to="/admin/homepage/banner" className={linkClass} onClick={handleCloseMenus}>
                  Banner
                </NavLink>
                <NavLink to="/admin/homepage/categories" className={linkClass} onClick={handleCloseMenus}>
                  Categories
                </NavLink>
                <NavLink to="/admin/homepage/promotions" className={linkClass} onClick={handleCloseMenus}>
                  Promotions
                </NavLink>
              </div>
            )}
          </div>

          {/* Logout */}
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
