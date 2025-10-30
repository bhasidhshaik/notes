// frontend/lib/hooks/notes.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const NOTES_KEY = "notes";

// ===================
// GET NOTES (list with filters & pagination)
// ===================
export const useNotes = ({ search = "", tag = "", page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: [NOTES_KEY, { search, tag, page, limit }],
    queryFn: async () => {
      const params = { search, tag, page, limit };
      const { data } = await api.get("/notes", { params });
      return data;
    },
    keepPreviousData: true,
  });
};

// ===================
// GET SINGLE NOTE
// ===================
export const useNote = (id) =>
  useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const { data } = await api.get(`/notes/${id}`);
      return data.note;
    },
    enabled: !!id,
  });

// ===================
// CREATE NOTE
// ===================
export const useCreateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/notes", payload);
      return data.note;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [NOTES_KEY] }),
  });
};

// ===================
// UPDATE NOTE
// ===================
export const useUpdateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await api.put(`/notes/${id}`, payload);
      return data.note;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [NOTES_KEY] });
      qc.invalidateQueries({ queryKey: ["note", res._id] });
    },
  });
};

// ===================
// DELETE NOTE
// ===================
export const useDeleteNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/notes/${id}`);
      return id;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [NOTES_KEY] });
      const previous = qc.getQueryData([NOTES_KEY]);
      qc.setQueryData([NOTES_KEY], (old) => {
        if (!old) return old;
        return {
          ...old,
          notes: old.notes.filter((n) => n._id !== id),
          pagination: {
            ...old.pagination,
            total: Math.max(0, old.pagination.total - 1),
          },
        };
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) qc.setQueryData([NOTES_KEY], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: [NOTES_KEY] }),
  });
};
// export const useDeleteNote = () => {
//   return useMutation({
//     mutationFn: async (id) => {
//       console.log("🔥 deleteNote mutationFn triggered with id:", id);
//       console.log("🧩 Axios baseURL:", api.defaults.baseURL);
//       const res = await api.delete(`/notes/${id}`);
//       return res.data;
//     },
//   });
// };
export const useDeletedNotes = () =>
  useQuery({
    queryKey: ["deleted-notes"],
    queryFn: async () => {
      const { data } = await api.get("/notes/deleted");
      return data.notes;
    },
  });

export const useRestoreNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.put(`/notes/restore/${id}`);
      return data.note;
    },
    onSuccess: () => {
      qc.invalidateQueries(["deleted-notes"]);
      qc.invalidateQueries(["notes"]);
    },
  });
};
