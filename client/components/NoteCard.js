// frontend/components/NoteCard.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function NoteCard({ note }) {
  const truncate = (text, n = 120) => (text?.length > n ? text.slice(0, n) + "..." : text);

  return (
    <article className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      <Link href={`/dashboard/notes/${note._id}`}>
        <h3 className="font-semibold text-lg mb-2 hover:underline">{truncate(note.title, 60)}</h3>
      </Link>
      <p className="text-sm text-gray-600 mb-3">{truncate(note.content, 140)}</p>
      <div className="flex gap-2 flex-wrap">
        {note.tags?.slice(0, 3).map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full border">{t}</span>
        ))}
      </div>
    </article>
  );
}
