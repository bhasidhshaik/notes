"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const truncate = (text, length = 80) =>
  text.length > length ? text.slice(0, length) + "..." : text;

const ListNotes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await api.get("/notes");
      return res.data.notes;
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to fetch notes");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        <p className="ml-2 text-gray-500">Loading notes...</p>
      </div>
    );

  if (isError || !data?.length)
    return (
      <div className="text-center text-gray-500 py-16">
        <p>No notes found. Create your first note!</p>
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-2xl border shadow-2xl">
      <h1 className="text-xl font-medium mb-4">List of Notes</h1>

      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {data.map((note, idx) => (
          <div
            key={note._id || idx}
            className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg mb-1">
              {truncate(note.title, 40)}
            </h2>
            <p className="text-sm text-gray-600">
              {truncate(note.content || note.description || "", 80)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNotes;
