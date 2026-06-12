// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoBookOutline,
  IoPeopleOutline,
  IoSwapHorizontal,
  IoGridOutline,
  IoPersonAddOutline,
  IoDocumentTextOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoLibraryOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import { useTheme } from "../../contexts/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { path: "/", label: "Dashboard", icon: IoBarChartOutline },
    { path: "/books", label: "Books", icon: IoBookOutline },
    { path: "/members", label: "Members", icon: IoPeopleOutline },
    { path: "/borrowing", label: "Borrowing", icon: IoSwapHorizontal },
    { path: "/categories", label: "Categories", icon: IoGridOutline },
    { path: "/authors", label: "Authors", icon: IoPersonAddOutline },
    { path: "/reports", label: "Reports", icon: IoDocumentTextOutline },
    {
      path: "/notifications",
      label: "Notifications",
      icon: IoNotificationsOutline,
    },
    { path: "/profile", label: "Profile", icon: IoLibraryOutline },
    { path: "/settings", label: "Settings", icon: IoSettingsOutline },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <IoLibraryOutline className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              LibManage
            </span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </button>
        </div>

        <nav className="mt-6 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
