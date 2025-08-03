// frontend/src/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminHeader from "../admin/components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64">
        <AdminSidebar />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
