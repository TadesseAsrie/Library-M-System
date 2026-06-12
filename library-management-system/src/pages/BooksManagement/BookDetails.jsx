// src/pages/BooksManagement/BookDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, getAuthorName, getCategoryName } = useAppContext();
  const book = books.find((b) => b.id === id);

  if (!book) return <div className="p-6 text-center">Book not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="secondary"
        onClick={() => navigate("/books")}
        className="mb-6"
      >
        ← Back to Books
      </Button>
      <Card>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full md:w-64 h-80 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="space-y-3">
              <p>
                <strong>Author:</strong> {getAuthorName(book.authorId)}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Category:</strong> {getCategoryName(book.categoryId)}
              </p>
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Publication Year:</strong> {book.publicationYear}
              </p>
              <p>
                <strong>Quantity:</strong> {book.quantity}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${book.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {book.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
