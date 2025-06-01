import Note from '../models/note.js';

export const createNote = async (req, res) => {
  try {
    const note = new Note({ ...req.body, createdBy: req.user.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(403).json({ error: "Unauthorized or not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const result = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!result) return res.status(403).json({ error: "Unauthorized or not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
