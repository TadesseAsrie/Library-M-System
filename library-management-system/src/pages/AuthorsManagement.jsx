// src/pages/AuthorsManagement.jsx
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useToast } from "../contexts/ToastContext";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { generateId } from "../data/mockData";

const AuthorsManagement = () => {
  const { authors, dispatch } = useAppContext();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    birthYear: "",
  });

  const filteredAuthors = authors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    if (editingAuthor) {
      dispatch({
        type: "UPDATE_AUTHOR",
        payload: { ...formData, id: editingAuthor.id },
      });
      addToast("Author updated", "success");
    } else {
      dispatch({
        type: "ADD_AUTHOR",
        payload: { ...formData, id: generateId() },
      });
      addToast("Author added", "success");
    }
    setIsModalOpen(false);
    setEditingAuthor(null);
    setFormData({ name: "", bio: "", birthYear: "" });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete author "${name}"?`)) {
      dispatch({ type: "DELETE_AUTHOR", payload: id });
      addToast("Author deleted", "success");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Authors Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Author</Button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search authors..."
          className="max-w-md"
        />
      </div>

      <Table headers={["Name", "Bio", "Birth Year", "Actions"]}>
        {filteredAuthors.map((author) => (
          <tr key={author.id}>
            <td className="px-6 py-4 font-medium">{author.name}</td>
            <td className="px-6 py-4">{author.bio}</td>
            <td className="px-6 py-4">{author.birthYear}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingAuthor(author);
                    setFormData(author);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(author.id, author.name)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAuthor(null);
        }}
        title={editingAuthor ? "Edit Author" : "Add Author"}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <Input
            label="Birth Year"
            value={formData.birthYear}
            onChange={(e) =>
              setFormData({ ...formData, birthYear: e.target.value })
            }
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingAuthor ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorsManagement;
