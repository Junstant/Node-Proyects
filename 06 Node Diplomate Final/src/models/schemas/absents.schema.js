const mongoose = require('mongoose');

const absentSchema = new mongoose.Schema({
  module: { // Referencia al módulo (materia) al que pertenece la falta
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  date: { // Fecha de la falta
    type: Date,
    required: true,
  },
  reason: { // Motivo de la falta
    type: String,
    required: true,
  },
  absenceNumber: { // Número de la falta
    type: Number,
    required: true,
  },
});

const Absent = mongoose.model('Absent', absentSchema);

export default Absent;
