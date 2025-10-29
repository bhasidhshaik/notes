import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, default: "", maxlength: 2000 },
    tags: [{ type: String, trim: true, lowercase: true }],
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
      
  { timestamps: true }
);

NoteSchema.index({ title: "text", content: "text", tags: "text" });

NoteSchema.index({ user: 1, archived: 1, updatedAt: -1 });


export default mongoose.model("Note", NoteSchema);
