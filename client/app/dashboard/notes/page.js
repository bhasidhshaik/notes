// frontend/app/notes/page.jsx
"use client";
import React from "react";
// import { useNotes, useCreateNote } from "../../lib/hooks/notes";
import { useNotes, useCreateNote } from "@/lib/hooks/notes";
// import NoteCard from "../../components/NoteCard";
import NoteCard from "@/components/NoteCard";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { Router, useRouter } from "next/navigation";

export default function NotesPage() {
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;
const router = useRouter()
  const { data, isLoading, isError } = useNotes({ search: debouncedSearch, page, limit });
  const createNote = useCreateNote();

  // debounce search
  const onSearch = React.useMemo(
    () =>
      debounce((q) => {
        setDebouncedSearch(q);
        setPage(1);
      }, 300),
    []
  );

  React.useEffect(() => () => onSearch.cancel(), [onSearch]);

  const handleCreateSample =  () => {
   router.push('/dashboard/create');
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-6 flex-col lg:flex-row">
        <h1 className="text-xl font-semibold">Notes</h1>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search notes..."
            className="px-3 py-2 border rounded-md"
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            value={search}
          />
          <button onClick={handleCreateSample} className="px-4 py-2 rounded-lg border">
            + New
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load notes</p>
      ) : (
        <>
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
            {data?.notes?.length ? (
              data.notes.map((note) => <NoteCard key={note._id} note={note} />)
            ) : (
              <p>No notes found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              Page {data?.pagination?.page || page} of {data?.pagination?.pages || 1}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded border"
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded border"
                disabled={page >= (data?.pagination?.pages || 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
