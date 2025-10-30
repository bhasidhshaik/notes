"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useNote, useUpdateNote, useDeleteNote } from "@/lib/hooks/notes";
import toast from "react-hot-toast";
import { Pencil, Trash2, Save, ArrowLeft } from "lucide-react";

export default function NoteDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data: note, isLoading, isError } = useNote(id);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", tags: [] });

  // populate form when note loads
  React.useEffect(() => {
    if (note) {
      setForm({
        title: note.title || "",
        content: note.content || "",
        tags: note.tags || [],
      });
    }
  }, [note]);

  const handleUpdate = async () => {
    try {
      await updateNote.mutateAsync({ id, payload: form });
      toast.success("Note updated");
      setIsEditing(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this note permanently?")) return;
    try {
      await deleteNote.mutateAsync(id);
      toast.success("Note deleted");
      router.push("/dashboard/notes");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !note) return <p className="p-6 text-red-500">Note not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              <Save size={16} /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 border px-3 py-1 rounded-md hover:bg-gray-100"
            >
              <Pencil size={16} /> Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 border border-red-500 text-red-600 px-3 py-1 rounded-md hover:bg-red-50"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Form / View */}
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <>
            <input
              className="w-full border rounded-md p-2 text-lg font-semibold"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              className="w-full border rounded-md p-2 min-h-[200px]"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your note..."
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold break-words">{note.title}</h1>
            <p className="whitespace-pre-wrap text-gray-700">{note.content}</p>
          </>
        )}

        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mt-4">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
