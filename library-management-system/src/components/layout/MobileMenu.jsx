// src/components/layout/MobileMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoLibraryOutline } from "react-icons/io5";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <IoLibraryOutline className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold">LibManage</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        <nav className="mt-6 px-4">
          {/* Navigation items would go here, same as Sidebar */}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
