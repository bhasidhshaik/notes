"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Camera, Save, KeyRound } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "" });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", bio: user.bio || "" });
      setPreview(user.profile);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("bio", form.bio);
      if (file) formData.append("profile", file);

      const { data } = await api.put("/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      setUser(data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwords.oldPassword || !passwords.newPassword) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const { data } = await api.put("/user/change-password", passwords);
      toast.success(data.message || "Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* PROFILE CARD */}
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white shadow p-6 rounded-2xl space-y-6 border"
      >
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28">
            <Image
              src={preview || "/default-avatar.png"}
              alt="Profile"
              width={112}
              height={112}
              className="rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-200 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-200 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition w-full"
        >
          <Save size={18} />
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>

      {/* CHANGE PASSWORD */}
      <div className="bg-white shadow p-6 rounded-2xl space-y-4 border mt-10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <KeyRound size={18} /> Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-200 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-200 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
