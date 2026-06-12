// src/components/ui/ToastContainer.jsx
import React from "react";
import { useToast } from "../../contexts/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
