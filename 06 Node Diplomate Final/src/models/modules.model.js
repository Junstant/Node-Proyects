import mongoose, { model } from "mongoose";
import Schedule from "./schemas/schedule.schema.js";
import Absent from "./schemas/absents.schema.js";
import Note from "./schemas/notes.schema.js";
import Homework from "./schemas/homeworks.schema.js";

const moduleSchema = new mongoose.Schema({
    'index':{ //# id de la materia se genera automaticamente inmutable
        type: String, 
        required: true,
    },
    'name':{ //# nombre de la materia ingresado por el usuario
        type: String,
        required: true
    },
    'schedule':[{ //:: horario de la materia objeto con los dias y horas
        type: mongoose.Schema.Types.ObjectId,
        ref: Schedule, // Referencia al modelo Schedule
        required: true,
    }],
    'location':{ //# ubicacion de la materia ingresado por el usuario
        type: String,
        required: true
    },
    'proffesor':{ //# nombre del profesor ingresado por el usuario
        type: String,
        required: true
    },
    'dependencies': [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: () => Module, // lazy reference avoids premature loading.
    }],
    'state':{ //# En curso, Aprobado, Reprobado, Pendiente
        type: String,
        enum: ['In Progress', 'Approved', 'Failed', 'Pending'],
        required: true
    },
    'absents': [{ //:: Faltas con detalles específicos
        type: mongoose.Schema.Types.ObjectId,
        ref: Absent, 
    }],
    'period': { // # Año y semestre de la materia
        year: { type: Number, required: true },
        semester: { type: String, required: true, enum: ['Bimonthly','Quarterly','Four-monthly','Annual']},
      },
    'notes': [{ //:: Array de referencias con las notas de la materia
        type: mongoose.Schema.Types.ObjectId, 
        ref: Note  
    }],
    'homeworks':[{ //:: Array de referencias con las tareas de la materia
        type: mongoose.Schema.Types.ObjectId,
        ref: Homework, // Nombre del modelo de la tarea
        required: true
    }]
});

// * ---------> Exportamos el modelo
const Module = mongoose.model('Module', moduleSchema);

export default Module;
