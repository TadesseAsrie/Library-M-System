// src/components/ui/SearchInput.jsx
import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

export default SearchInput;
