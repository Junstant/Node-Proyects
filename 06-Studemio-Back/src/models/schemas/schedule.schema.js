import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  fromHr: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Valida formato 24 horas
  },
  toHr: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Valida formato 24 horas
  },
});

const scheduleSchema = new mongoose.Schema({
  days: {
    type: [daySchema],
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;