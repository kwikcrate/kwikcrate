import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminHeader from "../admin/components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block md:w-64 bg-gray-800 border-r border-gray-700">
        <AdminSidebar />
      </aside>

      {/* Header for Mobile */}
      <header className="block md:hidden sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
        <AdminHeader />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
