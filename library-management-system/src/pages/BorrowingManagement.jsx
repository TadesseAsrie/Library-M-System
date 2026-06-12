// src/pages/BorrowingManagement.jsx
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useToast } from "../contexts/ToastContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Table from "../components/ui/Table";
import { generateId } from "../data/mockData";

const BorrowingManagement = () => {
  const { books, members, borrows, dispatch, getMemberName, getBookTitle } =
    useAppContext();
  const { addToast } = useToast();
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [returnBorrowId, setReturnBorrowId] = useState("");

  const handleBorrow = () => {
    if (!selectedMember || !selectedBook) {
      addToast("Please select member and book", "warning");
      return;
    }
    const book = books.find((b) => b.id === selectedBook);
    if (book.quantity < 1) {
      addToast("Book not available", "error");
      return;
    }
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const newBorrow = {
      id: generateId(),
      memberId: selectedMember,
      bookId: selectedBook,
      borrowDate: new Date().toISOString().split("T")[0],
      returnDate: null,
      dueDate: dueDate.toISOString().split("T")[0],
      status: "Borrowed",
    };
    dispatch({ type: "BORROW_BOOK", payload: newBorrow });
    addToast("Book borrowed successfully", "success");
    setSelectedMember("");
    setSelectedBook("");
  };

  const handleReturn = () => {
    if (!returnBorrowId) {
      addToast("Please select a borrowed book to return", "warning");
      return;
    }
    dispatch({ type: "RETURN_BOOK", payload: returnBorrowId });
    addToast("Book returned successfully", "success");
    setReturnBorrowId("");
  };

  const activeBorrows = borrows.filter((b) => b.status === "Borrowed");
  const borrowHistory = borrows;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Borrowing Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>
          <div className="space-y-4">
            <Select
              label="Member"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              options={[
                { value: "", label: "Select Member" },
                ...members.map((m) => ({ value: m.id, label: m.fullName })),
              ]}
            />
            <Select
              label="Book"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              options={[
                { value: "", label: "Select Book" },
                ...books
                  .filter((b) => b.quantity > 0)
                  .map((b) => ({
                    value: b.id,
                    label: `${b.title} (${b.quantity} left)`,
                  })),
              ]}
            />
            <Button onClick={handleBorrow}>Borrow Book</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Return Book</h2>
          <div className="space-y-4">
            <Select
              label="Borrowed Book"
              value={returnBorrowId}
              onChange={(e) => setReturnBorrowId(e.target.value)}
              options={[
                { value: "", label: "Select Borrowed Book" },
                ...activeBorrows.map((b) => ({
                  value: b.id,
                  label: `${getMemberName(b.memberId)} - ${getBookTitle(b.bookId)}`,
                })),
              ]}
            />
            <Button onClick={handleReturn}>Return Book</Button>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Borrow History</h2>
        <Table
          headers={[
            "Borrow ID",
            "Member",
            "Book",
            "Borrow Date",
            "Due Date",
            "Return Date",
            "Status",
          ]}
        >
          {borrowHistory.map((borrow) => (
            <tr key={borrow.id}>
              <td className="px-6 py-4">{borrow.id}</td>
              <td className="px-6 py-4">{getMemberName(borrow.memberId)}</td>
              <td className="px-6 py-4">{getBookTitle(borrow.bookId)}</td>
              <td className="px-6 py-4">{borrow.borrowDate}</td>
              <td className="px-6 py-4">{borrow.dueDate}</td>
              <td className="px-6 py-4">{borrow.returnDate || "-"}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${borrow.status === "Borrowed" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                >
                  {borrow.status}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

export default BorrowingManagement;
