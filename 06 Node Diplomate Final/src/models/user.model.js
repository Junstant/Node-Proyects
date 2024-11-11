import mongoose from 'mongoose';
import Career from './career.model.js';
//Esquema:
/*
Usuario:
- Carreras:
  - Años:
    - Materias:
*/


// * ---------> Definimos el esquema del alumno
const userSchema = new mongoose.Schema({
  name: { // # Nombre del usuario
    type: String,
    required: true,
    trim: true
  },
  email: { // # Correo del usuario
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validación de formato de email
  },
  password: { // # Contraseña del usuario encriptada
    type: String,
    required: true,
    minlength: 6 
  },
  emailVerified: { // # Bandera que indica si el correo del usuario ha sido verificado
    type: Boolean,
    default: false
  },
  verifyToken: { // # Token de verificación con los datos del usuario
    type: String,
    required: true
  },
  role: { // # Rol del usuario
    type: String,
    required: true,
    enum: ['user', 'admin'], // Limita los valores a 'user' o 'admin'
    default: 'user'
  },
  career: { // #:: Carrera del usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: Career,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
