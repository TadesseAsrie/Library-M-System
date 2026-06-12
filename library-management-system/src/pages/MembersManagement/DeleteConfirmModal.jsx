// src/pages/MembersManagement/DeleteConfirmModal.jsx
import React from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" size="sm">
      <p className="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete "{itemName}"? This action cannot be
        undone.
      </p>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
