"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { useDeletedNotes, useRestoreNote } from "@/lib/hooks/notes";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeletedNotesPage() {
  const { data: deletedNotes = [], isLoading } = useDeletedNotes();
  const restoreNote = useRestoreNote();

  const handleRestore = (id) => {
    restoreNote.mutate(id, {
      onSuccess: () => toast.success("Note restored successfully"),
      onError: () => toast.error("Failed to restore note"),
    });
  };

  return (
    <div className="pt-14 px-6">
      <div className="flex items-center gap-2 mb-6">
        <Trash2 className="text-red-600" />
        <h2 className="text-2xl font-semibold">Recently Deleted</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-gray-400" size={24} />
        </div>
      ) : deletedNotes.length === 0 ? (
        <p className="text-gray-500 text-sm">No deleted notes found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {deletedNotes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-medium text-lg">{note.title}</h3>
                <p className="text-xs text-gray-500">
                  Deleted on {new Date(note.deletedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => handleRestore(note._id)}
                className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-200 transition"
                disabled={restoreNote.isPending}
              >
                {restoreNote.isPending ? "Restoring..." : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
