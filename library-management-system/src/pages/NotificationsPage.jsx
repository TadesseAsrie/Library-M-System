// src/pages/NotificationsPage.jsx
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "../components/ui/Card";

const NotificationsPage = () => {
  const { borrows, members, getMemberName, getBookTitle } = useAppContext();
  const today = new Date().toISOString().split("T")[0];
  const overdueBorrows = borrows.filter(
    (b) => b.status === "Borrowed" && b.dueDate < today,
  );
  const recentMembers = members.slice(-3);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Overdue Books
          </h2>
          {overdueBorrows.length === 0 ? (
            <p>No overdue books</p>
          ) : (
            <div className="space-y-3">
              {overdueBorrows.map((borrow) => (
                <div
                  key={borrow.id}
                  className="p-3 bg-red-50 dark:bg-red-900/20 rounded"
                >
                  <p>
                    <strong>{getMemberName(borrow.memberId)}</strong> -{" "}
                    {getBookTitle(borrow.bookId)}
                  </p>
                  <p className="text-sm">Due: {borrow.dueDate}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            New Members
          </h2>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="p-3 bg-green-50 dark:bg-green-900/20 rounded"
              >
                <p>
                  <strong>{member.fullName}</strong>
                </p>
                <p className="text-sm">Registered: {member.registrationDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
