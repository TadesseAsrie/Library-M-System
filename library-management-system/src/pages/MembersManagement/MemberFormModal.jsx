// src/pages/MembersManagement/MemberFormModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../contexts/ToastContext";
import { generateId } from "../../data/mockData";

const MemberFormModal = ({ isOpen, onClose, member }) => {
  const { dispatch } = useAppContext();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    registrationDate: new Date().toISOString().split("T")[0],
    membershipStatus: "Active",
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        registrationDate: new Date().toISOString().split("T")[0],
        membershipStatus: "Active",
      });
    }
  }, [member]);

  const handleSubmit = () => {
    if (member) {
      dispatch({
        type: "UPDATE_MEMBER",
        payload: { ...formData, id: member.id },
      });
      addToast("Member updated successfully", "success");
    } else {
      dispatch({
        type: "ADD_MEMBER",
        payload: { ...formData, id: generateId() },
      });
      addToast("Member added successfully", "success");
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={member ? "Edit Member" : "Add New Member"}
      size="lg"
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {member ? "Update" : "Add"} Member
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberFormModal;
