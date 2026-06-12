// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import AppRoutes from "./router/AppRoutes";
import ToastContainer from "./components/ui/ToastContainer";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <AppRoutes />
            </div>
            <ToastContainer />
          </BrowserRouter>
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
