// src/pages/BooksManagement/BooksList.jsx
import React, { useState, useMemo } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../contexts/ToastContext";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import Pagination from "../../components/ui/Pagination";
import Modal from "../../components/ui/Modal";
import BookFormModal from "./BookFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Link } from "react-router-dom";
import { IoEye, IoCreate, IoTrash } from "react-icons/io5";

const BooksList = () => {
  const {
    books,
    categories,
    authors,
    dispatch,
    getAuthorName,
    getCategoryName,
  } = useAppContext();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const itemsPerPage = 5;

  const filteredBooks = useMemo(() => {
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        getAuthorName(book.authorId)
          .toLowerCase()
          .includes(search.toLowerCase()),
    );

    if (categoryFilter) {
      filtered = filtered.filter((book) => book.categoryId === categoryFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "year") return b.publicationYear - a.publicationYear;
      return 0;
    });

    return filtered;
  }, [books, search, categoryFilter, sortBy, getAuthorName]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = () => {
    dispatch({ type: "DELETE_BOOK", payload: deletingBook.id });
    addToast("Book deleted successfully", "success");
    setDeletingBook(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add New Book</Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by title or author..."
          className="flex-1 min-w-[200px]"
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={[
            { value: "", label: "All Categories" },
            ...categories.map((c) => ({ value: c.id, label: c.name })),
          ]}
          className="w-48"
        />
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: "title", label: "Sort by Title" },
            { value: "year", label: "Sort by Year" },
          ]}
          className="w-48"
        />
      </div>

      <Table
        headers={[
          "Cover",
          "Title",
          "Author",
          "Category",
          "Quantity",
          "Status",
          "Actions",
        ]}
      >
        {paginatedBooks.map((book) => (
          <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-10 h-14 object-cover rounded"
              />
            </td>
            <td className="px-6 py-4 font-medium">{book.title}</td>
            <td className="px-6 py-4">{getAuthorName(book.authorId)}</td>
            <td className="px-6 py-4">{getCategoryName(book.categoryId)}</td>
            <td className="px-6 py-4">{book.quantity}</td>
            <td className="px-6 py-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${book.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {book.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Link to={`/books/${book.id}`}>
                  <Button variant="outline" size="sm">
                    <IoEye />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingBook(book)}
                >
                  <IoCreate />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeletingBook(book)}
                >
                  <IoTrash />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <BookFormModal
        isOpen={isAddModalOpen || !!editingBook}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingBook(null);
        }}
        book={editingBook}
      />
      <DeleteConfirmModal
        isOpen={!!deletingBook}
        onClose={() => setDeletingBook(null)}
        onConfirm={handleDelete}
        itemName={deletingBook?.title}
      />
    </div>
  );
};

export default BooksList;
