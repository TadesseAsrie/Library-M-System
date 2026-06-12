// src/components/layout/TopNavbar.jsx
import React, { useState } from "react";
import {
  IoMenu,
  IoNotificationsOutline,
  IoPersonCircle,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const TopNavbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IoMenu size={24} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IoNotificationsOutline size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Link
            to="/profile"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IoPersonCircle
              size={28}
              className="text-gray-600 dark:text-gray-300"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
