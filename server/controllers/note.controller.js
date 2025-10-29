import Note from "../models/Note.js";

// ===================
// CREATE NOTE
// ===================
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags: tags || [],
    });

    res.status(201).json({ success: true, message: "Note created", note });
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// GET NOTES (with search, filter, pagination)
// ===================
export const getNotes = async (req, res) => {
  try {
    const { search, tag, page = 1, limit = 10 } = req.query;
    const query = { user: req.user._id };

 if (search) {
  query.$or = [
    { title: { $regex: search, $options: "i" } },
    { content: { $regex: search, $options: "i" } },
    { tags: { $regex: search, $options: "i" } },
  ];
}

    if (tag) query.tags = tag;

    const notes = await Note.find(query)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Note.countDocuments(query);

    res.status(200).json({
      success: true,
      notes,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Notes Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// GET SINGLE NOTE
// ===================
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error("Get Note Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// UPDATE NOTE
// ===================
export const updateNote = async (req, res) => {
  try {
    const { title, content, tags, archived } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content, tags, archived },
      { new: true }
    );

    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, message: "Note updated", note });
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================
// DELETE NOTE
// ===================
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    note.deleted = true;
    note.deletedAt = new Date();
    await note.save();

    res.status(200).json({ success: true, message: "Note moved to trash", note });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const restoreNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id, deleted: true });
    if (!note) return res.status(404).json({ success: false, message: "Note not found in trash" });

    note.deleted = false;
    note.deletedAt = null;
    await note.save();

    res.status(200).json({ success: true, message: "Note restored", note });
  } catch (error) {
    console.error("Restore Note Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getDeletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id, deleted: true }).sort({ deletedAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Get Deleted Notes Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

