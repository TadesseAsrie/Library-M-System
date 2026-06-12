// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTheme } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { addToast } = useToast();
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
  });

  const saveSettings = () => {
    addToast("Settings saved successfully", "success");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-primary-600" : "bg-gray-300"}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transform transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Language</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    email: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) =>
                  setNotifications({ ...notifications, push: e.target.checked })
                }
                className="w-5 h-5"
              />
            </label>
          </div>
        </Card>

        <Button onClick={saveSettings}>Save All Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
