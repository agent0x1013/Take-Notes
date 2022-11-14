const Note = require("../models/noteModel");
const User = require("../models/userModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await User.findById(req.user.id)
        .select("notes")
        .populate("notes");
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file.filename;
      const note = new Note({ title, description, image });
      User.findByIdAndUpdate(
        req.user.id,
        { $push: { notes: note._id } },
        (err) => {
          if (err) res.json(err);
        }
      );
      await note.save();
      res.json({ msg: "Note is added" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      User.findByIdAndUpdate(
        req.user.id,
        { $pull: { notes: req.params.id } },
        (err) => {
          if (err) res.json(err);
        }
      );
      res.json({ msg: "Note is Deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file.filename;
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, image }
      );

      res.json({ msg: "Note is updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteCtrl;
