import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Top Header */}
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between w-full fixed top-0 left-0 z-50 h-16 md:hidden">
        <button onClick={() => setIsOpen(true)} className="text-white">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold mx-auto">Home Craft Admin</h1>
      </header>

      {/* Sidebar for Large Screens */}
      <aside className="hidden md:flex flex-col bg-gray-900 text-white w-64 h-screen p-5 fixed left-0 top-0">
        <h1 className="text-xl font-bold text-center mb-6">Home Craft Admin</h1>
        <nav className="space-y-4">
          <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link>
          <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Users</Link>
          <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Products</Link>
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="bg-gray-900 text-white w-64 h-full p-5 absolute left-0 top-0">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
              <X size={24} />
            </button>
            <h1 className="text-xl font-bold text-center mb-6">Home Craft Admin</h1>
            <nav className="space-y-4">
              <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Manage Users</Link>
              <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>Manage Products</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
