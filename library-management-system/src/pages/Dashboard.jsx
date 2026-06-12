// src/pages/Dashboard.jsx
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  IoBookOutline,
  IoBookmarkOutline,
  IoSwapHorizontal,
  IoPeopleOutline,
} from "react-icons/io5";
import SimpleBarChart from "../components/charts/SimpleBarChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { books, members, borrows } = useAppContext();

  const totalBooks = books.length;
  const availableBooks = books
    .filter((b) => b.status === "Available")
    .reduce((sum, b) => sum + b.quantity, 0);
  const borrowedBooks = borrows.filter((b) => b.status === "Borrowed").length;
  const totalMembers = members.length;

  const recentActivities = [
    { id: 1, action: "New book added", time: "2 hours ago" },
    { id: 2, action: "Book returned", time: "5 hours ago" },
    { id: 3, action: "New member registered", time: "1 day ago" },
  ];

  const chartData = [
    { month: "Jan", books: 45 },
    { month: "Feb", books: 52 },
    { month: "Mar", books: 48 },
    { month: "Apr", books: 61 },
    { month: "May", books: 55 },
    { month: "Jun", books: 67 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Total Books
            </p>
            <p className="text-3xl font-bold mt-1">{totalBooks}</p>
          </div>
          <IoBookOutline size={40} className="text-primary-500 opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Available Books
            </p>
            <p className="text-3xl font-bold mt-1 text-green-600">
              {availableBooks}
            </p>
          </div>
          <IoBookmarkOutline size={40} className="text-green-500 opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Borrowed Books
            </p>
            <p className="text-3xl font-bold mt-1 text-orange-600">
              {borrowedBooks}
            </p>
          </div>
          <IoSwapHorizontal size={40} className="text-orange-500 opacity-50" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Total Members
            </p>
            <p className="text-3xl font-bold mt-1">{totalMembers}</p>
          </div>
          <IoPeopleOutline size={40} className="text-primary-500 opacity-50" />
        </Card>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            Monthly Book Circulation
          </h3>
          <SimpleBarChart data={chartData} xKey="month" yKey="books" />
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2 border-b dark:border-gray-700"
              >
                <span>{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Link to="/books">
              <Button variant="primary" size="sm">
                Manage Books
              </Button>
            </Link>
            <Link to="/borrowing">
              <Button variant="secondary" size="sm">
                New Borrowing
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
