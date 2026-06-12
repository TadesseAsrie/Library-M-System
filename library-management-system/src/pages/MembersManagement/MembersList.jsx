// src/pages/MembersManagement/MembersList.jsx
import React, { useState, useMemo } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../contexts/ToastContext";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Pagination from "../../components/ui/Pagination";
import Modal from "../../components/ui/Modal";
import MemberFormModal from "./MemberFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Link } from "react-router-dom";
import { IoEye, IoCreate, IoTrash } from "react-icons/io5";

const MembersList = () => {
  const { members, dispatch } = useAppContext();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  const itemsPerPage = 5;

  const filteredMembers = useMemo(() => {
    return members.filter(
      (m) =>
        m.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [members, search]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = () => {
    dispatch({ type: "DELETE_MEMBER", payload: deletingMember.id });
    addToast("Member deleted successfully", "success");
    setDeletingMember(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add New Member</Button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email..."
          className="max-w-md"
        />
      </div>

      <Table
        headers={[
          "Member ID",
          "Full Name",
          "Email",
          "Phone",
          "Status",
          "Actions",
        ]}
      >
        {paginatedMembers.map((member) => (
          <tr
            key={member.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td className="px-6 py-4">{member.id}</td>
            <td className="px-6 py-4 font-medium">{member.fullName}</td>
            <td className="px-6 py-4">{member.email}</td>
            <td className="px-6 py-4">{member.phone}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {member.membershipStatus}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Link to={`/members/${member.id}`}>
                  <Button variant="outline" size="sm">
                    <IoEye />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingMember(member)}
                >
                  <IoCreate />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeletingMember(member)}
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

      <MemberFormModal
        isOpen={isAddModalOpen || !!editingMember}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMember(null);
        }}
        member={editingMember}
      />
      <DeleteConfirmModal
        isOpen={!!deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDelete}
        itemName={deletingMember?.fullName}
      />
    </div>
  );
};

export default MembersList;
