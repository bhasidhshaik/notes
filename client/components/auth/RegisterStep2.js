"use client";
import { useRef, useState } from "react";

export default function RegisterStep2({
  form,
  setForm,
  handleBack,
  handleSubmit,
  loading,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    form.profile ? URL.createObjectURL(form.profile) : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, profile: file });
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setForm({ ...form, profile: null });
    setPreview(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile Details</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio (optional)</label>
        <textarea
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Tell us something about you"
          className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Profile Image (optional)</label>
        {preview ? (
          <div className="relative w-24 h-24">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="border border-dashed border-slate-400 rounded-lg w-full py-6 text-center hover:bg-slate-50"
          >
            Upload Image
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 rounded-lg border border-slate-400 text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-semibold cursor-pointer text-white transition 
            ${loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-800"}`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
