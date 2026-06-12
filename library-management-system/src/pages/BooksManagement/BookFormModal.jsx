// src/pages/BooksManagement/BookFormModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../contexts/ToastContext";
import { generateId } from "../../data/mockData";

const BookFormModal = ({ isOpen, onClose, book }) => {
  const { categories, authors, dispatch } = useAppContext();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    isbn: "",
    categoryId: "",
    publisher: "",
    publicationYear: new Date().getFullYear(),
    quantity: 1,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: "",
        authorId: authors[0]?.id || "",
        isbn: "",
        categoryId: categories[0]?.id || "",
        publisher: "",
        publicationYear: new Date().getFullYear(),
        quantity: 1,
        coverImage:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150",
      });
    }
  }, [book, authors, categories]);

  const handleSubmit = () => {
    if (book) {
      dispatch({ type: "UPDATE_BOOK", payload: { ...formData, id: book.id } });
      addToast("Book updated successfully", "success");
    } else {
      dispatch({
        type: "ADD_BOOK",
        payload: {
          ...formData,
          id: generateId(),
          status: formData.quantity > 0 ? "Available" : "Borrowed",
        },
      });
      addToast("Book added successfully", "success");
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={book ? "Edit Book" : "Add New Book"}
      size="lg"
    >
      <div className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          label="Author"
          value={formData.authorId}
          onChange={(e) =>
            setFormData({ ...formData, authorId: e.target.value })
          }
          options={authors.map((a) => ({ value: a.id, label: a.name }))}
        />
        <Input
          label="ISBN"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        />
        <Select
          label="Category"
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          label="Publisher"
          value={formData.publisher}
          onChange={(e) =>
            setFormData({ ...formData, publisher: e.target.value })
          }
        />
        <Input
          label="Publication Year"
          type="number"
          value={formData.publicationYear}
          onChange={(e) =>
            setFormData({
              ...formData,
              publicationYear: parseInt(e.target.value),
            })
          }
        />
        <Input
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: parseInt(e.target.value) })
          }
        />
        <Input
          label="Cover Image URL"
          value={formData.coverImage}
          onChange={(e) =>
            setFormData({ ...formData, coverImage: e.target.value })
          }
        />
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{book ? "Update" : "Add"} Book</Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookFormModal;
