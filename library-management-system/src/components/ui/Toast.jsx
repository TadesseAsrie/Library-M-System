// src/components/ui/Toast.jsx
import React, { useEffect } from "react";
import {
  IoCheckmarkCircle,
  IoWarning,
  IoInformation,
  IoCloseCircle,
} from "react-icons/io5";

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: <IoCheckmarkCircle className="text-green-500" size={20} />,
    error: <IoCloseCircle className="text-red-500" size={20} />,
    warning: <IoWarning className="text-yellow-500" size={20} />,
    info: <IoInformation className="text-blue-500" size={20} />,
  };

  return (
    <div
      className={`flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-3 border-l-4 ${
        toast.type === "success"
          ? "border-green-500"
          : toast.type === "error"
            ? "border-red-500"
            : toast.type === "warning"
              ? "border-yellow-500"
              : "border-blue-500"
      } animate-slide-in`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-gray-800 dark:text-gray-200">
        {toast.message}
      </p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <IoCloseCircle size={18} />
      </button>
    </div>
  );
};

export default Toast;
