import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  getDeletedNotes,
  restoreNote,
} from "../controllers/note.controller.js";

const router = express.Router();

// ✅ Always put fixed routes BEFORE any dynamic `/:id`
router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/deleted", protect, getDeletedNotes);
router.put("/restore/:id", protect, restoreNote);
router.put("/:id", protect, updateNote);
router.get("/:id", protect, getNote);
router.delete("/:id", protect, deleteNote);

export default router;
