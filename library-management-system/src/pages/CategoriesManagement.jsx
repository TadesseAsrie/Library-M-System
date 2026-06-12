// src/pages/CategoriesManagement.jsx
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useToast } from "../contexts/ToastContext";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { generateId } from "../data/mockData";

const CategoriesManagement = () => {
  const { categories, dispatch } = useAppContext();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    if (editingCategory) {
      dispatch({
        type: "UPDATE_CATEGORY",
        payload: { ...formData, id: editingCategory.id },
      });
      addToast("Category updated", "success");
    } else {
      dispatch({
        type: "ADD_CATEGORY",
        payload: { ...formData, id: generateId() },
      });
      addToast("Category added", "success");
    }
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete category "${name}"?`)) {
      dispatch({ type: "DELETE_CATEGORY", payload: id });
      addToast("Category deleted", "success");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search categories..."
          className="max-w-md"
        />
      </div>

      <Table headers={["Name", "Description", "Actions"]}>
        {filteredCategories.map((category) => (
          <tr key={category.id}>
            <td className="px-6 py-4 font-medium">{category.name}</td>
            <td className="px-6 py-4">{category.description}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingCategory(category);
                    setFormData(category);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(category.id, category.name)}
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
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingCategory ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesManagement;
