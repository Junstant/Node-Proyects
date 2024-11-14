import * as db from "../dataBase/models.js";

const noteModule = {
  async createNotes(notes) {
    const newNotes = notes.map((note) => new db.Note({
      title: note.title,
      calification: note.calification,
    }));
    await db.Note.insertMany(newNotes);
    return newNotes;
  },
  async getNoteById(id) {
    return await db.Note.findById(id);
  },
  async removeNotes(noteIds) {
    return await db.Note.deleteMany({ _id: { $in: noteIds } });
  },
};
