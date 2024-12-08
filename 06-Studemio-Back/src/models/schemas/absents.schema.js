import mongoose from 'mongoose';

const absentSchema = new mongoose.Schema({
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
