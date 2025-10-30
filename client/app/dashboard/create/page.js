"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateNote } from "@/lib/hooks/notes";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const router = useRouter();
  const { mutateAsync: createNote, isPending } = useCreateNote();

  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      await createNote(form);
      toast.success("Note created successfully!");
      setForm({ title: "", content: "" });
      router.push("/dashboard/notes");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="pt-14 px-6 lg:max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Create a New Note</h2>
        <PlusCircle className="text-indigo-600 h-8 w-8" />
      </div>

      <div className="bg-white border rounded-2xl shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            disabled={isPending}
            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
          />
          <textarea
            name="content"
            placeholder="Write your note here..."
            rows={8}
            value={form.content}
            onChange={handleChange}
            disabled={isPending}
            className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
          ></textarea>

          <button
            type="submit"
            disabled={isPending}
            className="bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
