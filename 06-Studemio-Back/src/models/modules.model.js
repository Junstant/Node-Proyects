import mongoose, { model } from "mongoose";
import Schedule from "./schemas/schedule.schema.js";
import Absent from "./schemas/absents.schema.js";
import Note from "./schemas/notes.schema.js";
import Homework from "./schemas/homeworks.schema.js";

const moduleSchema = new mongoose.Schema({
    'name':{ //# nombre de la materia ingresado por el usuario
        type: String,
        required: false,
        default: 'Your title here'
    },
    'schedule':[{ //:: horario de la materia objeto con los dias y horas
        type: mongoose.Schema.Types.ObjectId,
        ref: Schedule, // Referencia al modelo Schedule
        required: false,
        default: []
    }],
    'location':{ //# ubicacion de la materia ingresado por el usuario
        type: String,
        required: false,
        default: 'Your location here'
    },
    'professor':{ //# nombre del profesor ingresado por el usuario
        type: String,
        required: false,
        default: 'Your proffesor here'
    },
    'dependencies': [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: () => Module, // lazy reference avoids premature loading.
    default: []
    }],
    'state':{ //# En curso, Aprobado, Reprobado, Pendiente
        type: String,
        enum: ['In Progress', 'Approved', 'Failed', 'Pending'],
        required: false,
        default: 'Pending'
    },
    'absents': [{ //:: Faltas con detalles específicos
        type: mongoose.Schema.Types.ObjectId,
        ref: Absent, 
        default: []
    }],
    'period': { // # Año y semestre de la materia
        year: { type: String, required: false, default: 'First Year', enum: ['First Year','Second Year','Third Year','Fourth Year','Fifth Year','Sixth Year','Seventh Year','Eighth Year','Ninth Year','Tenth Year'] },
        semester: { type: String, required: false, enum: ['Bimonthly','Quarterly','Four-monthly','Annual'], default: 'Annual'},
      },
    'notes': [{ //:: Array de referencias con las notas de la materia
        type: mongoose.Schema.Types.ObjectId, 
        ref: Note,
        default: []  
    }],
    'homeworks':[{ //:: Array de referencias con las tareas de la materia
        type: mongoose.Schema.Types.ObjectId,
        ref: Homework, // Nombre del modelo de la tarea
        default: []
    }],
    'color': {
    type: String,
    required: false,
    default: '#43A4FF',
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    },
});

// * ---------> Exportamos el modelo
const Module = mongoose.model('Module', moduleSchema);

export default Module;
