// src/pages/ReportsPage.jsx
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "../components/ui/Card";
import SimpleBarChart from "../components/charts/SimpleBarChart";

const ReportsPage = () => {
  const { books, members, borrows } = useAppContext();

  const booksByCategory = books.reduce((acc, book) => {
    const category = book.categoryId;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(booksByCategory).map(
    ([category, count]) => ({ category, count }),
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-gray-500">Total Books</p>
          <p className="text-3xl font-bold">{books.length}</p>
        </Card>
        <Card>
          <p className="text-gray-500">Total Members</p>
          <p className="text-3xl font-bold">{members.length}</p>
        </Card>
        <Card>
          <p className="text-gray-500">Total Borrows</p>
          <p className="text-3xl font-bold">{borrows.length}</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Books by Category</h2>
        <SimpleBarChart data={chartData} xKey="category" yKey="count" />
      </Card>
    </div>
  );
};

export default ReportsPage;
