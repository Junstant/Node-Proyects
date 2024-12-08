import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class noteModule {
  //^ --------------------> Create a new note
  static async createNote(moduleId, notes) {
    const savedNotes = [];

    //Recorrer las notas y guardarlas
    for (const note of notes) {
      const newNote = new db.Note({
        title: note.title,
        calification: note.calification,
      });

      //* ----> Guardar la nota en el módulo
      const added = await ModuleRepository.addNoteToModule(moduleId, newNote._id);
      if (!added) {
        throw new Error("[Note.Repository.CreateNote] - Error adding note to module");
      }

      //* ----> Guardar la nota
      const savedNote = await newNote.save(); 
      savedNotes.push(savedNote);
    }

    return savedNotes;
  }

  //^ --------------------> Find note by id
  static async getNoteById(id) {
    const note = await db.Note.findById(id);
    if (!note) {
      throw new Error("[Note.Repository.GetNoteById] - Note not found");
    }
    return note;
  }

  //^ --------------------> Get all notes
  static async getAllNotes(moduleId) {
    //! ---> Si el módulo no existe, lanzar un error
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Note.Repository.GetAllNotes] - Module not found");
    }
    //Obtener todas las notas del módulo
    const notes = await db.Note.find({ _id: { $in: moduleFinded.notes } });
    return notes;
  }

  //^ --------------------> Remove note
  static async removeNote(moduleId, id) {
    //! ---> Si el módulo no existe, lanzar un error
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Note.Repository.RemoveNote] - Module not found");
    }

    //! ---> Si la nota no existe, lanzar un error
    const note = await db.Note.findById(id);
    if (!note) {
      throw new Error("[Note.Repository.RemoveNote] - Note not found");
    }

    //Eliminar la nota del primero del módulo y luego de la base de datos
    ModuleRepository.removeNoteFromModule(moduleId, id);
    await db.Note.deleteOne({ _id: id });

    return note;
  }

  //^ --------------------> Update note
  static async updateNote(id, note) {
    const noteToUpdate = await db.Note.findById(id);

    if (!noteToUpdate) {
      throw new Error("[Note.Repository.UpdateNote] - Note not found");
    }

    noteToUpdate.title = note.title;
    noteToUpdate.calification = note.calification;

    const updatedNote = await noteToUpdate.save();

    return updatedNote;
  }
}

export default noteModule;
