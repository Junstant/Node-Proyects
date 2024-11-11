import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { // Título de la nota
    type: String,
    required: true,
  },
  calification: { // Calificación de la materia
    type: Number,
    required: true,
  },
});

const Note = mongoose.model('Note', noteSchema);

export default Note;