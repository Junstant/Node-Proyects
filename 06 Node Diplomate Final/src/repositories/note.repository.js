import * as db from "../dataBase/models.js";

class noteModule {
  //^ --------------------> Create a new note
  static async createNote(note) {
    const newNote = new db.Note({
      title: note.title,
      description: note.description,
      calification: note.calification,
    });
    await newNote.save();
    return newNote;
  }

  //^ --------------------> Find note by id
  static async getNoteById(id) {
    const note = await db.Note.findById(id);
    if (!note) {
      throw new Error("[Note.Repository.GetNoteById] - Note not found");
    }
    return note;
  }

  //^ --------------------> Remove note
  static async removeNote(id) {
    const note = await db.Note.findById(id);
    if (!note) {
      throw new Error("[Note.Repository.RemoveNote] - Note not found");
    }
    await db.Note.deleteOne({ note });
  }

  //^ --------------------> Update note
  static async updateNote(id, note) {
    const updatedNote = await db.Note.findById(id);
    if (!updatedNote) {
      throw new Error("[Note.Repository.UpdateNote] - Note not found");
    }
    updatedNote.title = note.title;
    updatedNote.description = note.description;
    updatedNote.calification = note.calification;
    return await updatedNote.save();
  }

  //^ --------------------> Get all notes
  static async getAllNotes() {
    const notes = await db.Note.find();
    if (!notes) {
      throw new Error("[Note.Repository.GetAllNotes] - Notes not found");
    }
    return notes;
  }
}

export default noteModule;
