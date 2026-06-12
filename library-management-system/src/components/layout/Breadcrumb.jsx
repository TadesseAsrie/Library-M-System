// src/components/layout/Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const getRouteName = (path) => {
    const names = {
      "": "Dashboard",
      books: "Books",
      members: "Members",
      borrowing: "Borrowing",
      categories: "Categories",
      authors: "Authors",
      reports: "Reports",
      notifications: "Notifications",
      profile: "Profile",
      settings: "Settings",
    };
    return names[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 py-3 px-4 bg-gray-50 dark:bg-gray-900/50">
      <Link to="/" className="hover:text-primary-600 flex items-center gap-1">
        <IoHome size={16} />
        Home
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span>/</span>
          {index === paths.length - 1 ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {getRouteName(path)}
            </span>
          ) : (
            <Link
              to={`/${paths.slice(0, index + 1).join("/")}`}
              className="hover:text-primary-600"
            >
              {getRouteName(path)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
