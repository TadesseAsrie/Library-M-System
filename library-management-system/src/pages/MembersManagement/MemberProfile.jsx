// src/pages/MembersManagement/MemberProfile.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members } = useAppContext();
  const member = members.find((m) => m.id === id);

  if (!member) return <div className="p-6 text-center">Member not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="secondary"
        onClick={() => navigate("/members")}
        className="mb-6"
      >
        ← Back to Members
      </Button>
      <Card>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{member.fullName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Member ID:</strong> {member.id}
            </p>
            <p>
              <strong>Email:</strong> {member.email}
            </p>
            <p>
              <strong>Phone:</strong> {member.phone}
            </p>
            <p>
              <strong>Address:</strong> {member.address}
            </p>
            <p>
              <strong>Registration Date:</strong> {member.registrationDate}
            </p>
            <p>
              <strong>Status:</strong> {member.membershipStatus}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MemberProfile;
