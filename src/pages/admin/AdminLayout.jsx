import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar & Header */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-800 overflow-y-auto mt-16 md:mt-0 md:ml-64">
        <Outlet /> {/* Admin pages render here */}
      </main>
    </div>
  );
};

export default AdminLayout;
