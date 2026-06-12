// src/pages/UserProfilePage.jsx
import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../contexts/ToastContext";

const UserProfilePage = () => {
  const { addToast } = useToast();
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@library.com",
    role: "Administrator",
    avatar:
      "https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=Admin",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = () => {
    addToast("Profile updated successfully", "success");
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      addToast("Passwords do not match", "error");
      return;
    }
    addToast("Password changed successfully", "success");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
        addToast("Profile image updated", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="text-center">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-3"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button variant="outline" size="sm">
                Upload Image
              </Button>
            </label>
          </div>
          <div className="flex-1 space-y-3">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <Input label="Role" value={profile.role} disabled />
            <Button onClick={handleProfileUpdate}>Update Profile</Button>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.current}
            onChange={(e) =>
              setPasswordData({ ...passwordData, current: e.target.value })
            }
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData.new}
            onChange={(e) =>
              setPasswordData({ ...passwordData, new: e.target.value })
            }
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirm}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirm: e.target.value })
            }
          />
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfilePage;
