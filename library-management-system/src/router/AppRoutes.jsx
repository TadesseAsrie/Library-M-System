// src/router/AppRoutes.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import Dashboard from "../pages/Dashboard";
import BooksList from "../pages/BooksManagement/BooksList";
import BookDetails from "../pages/BooksManagement/BookDetails";
import MembersList from "../pages/MembersManagement/MembersList";
import MemberProfile from "../pages/MembersManagement/MemberProfile";
import BorrowingManagement from "../pages/BorrowingManagement";
import CategoriesManagement from "../pages/CategoriesManagement";
import AuthorsManagement from "../pages/AuthorsManagement";
import ReportsPage from "../pages/ReportsPage";
import NotificationsPage from "../pages/NotificationsPage";
import UserProfilePage from "../pages/UserProfilePage";
import SettingsPage from "../pages/SettingsPage";

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <Breadcrumb />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/members" element={<MembersList />} />
            <Route path="/members/:id" element={<MemberProfile />} />
            <Route path="/borrowing" element={<BorrowingManagement />} />
            <Route path="/categories" element={<CategoriesManagement />} />
            <Route path="/authors" element={<AuthorsManagement />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppRoutes;
