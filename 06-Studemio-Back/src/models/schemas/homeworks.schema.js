import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({
    'title':{ //# titulo de la tarea ingresado por el usuario
        type: String,
        required: true
    },
    'deliveryDate':{ //# fecha de entrega de la tarea ingresado por el usuario
        type: Date,
        required: true
    },
    'description':{ //# descripcion de la tarea ingresado por el usuario
        type: String,
        required: true
    },
    'completed':{ //# bandera que indica si la tarea esta completada
        type: Boolean,
        required: true
    },
    'calification':{ //# calificacion de la tarea ingresado por el usuario
        type: Number,
        required: true
    },
    'remember': [{ //# arreglo de objetos con descripción y estado de recordatorio
        description: { //# descripción del recordatorio
            type: String,
            required: true
        },
        completed: { //# estado del recordatorio
            type: Boolean,
            required: true
        }
    }]
});

// * ---------> Exportamos el modelo
const Homework = mongoose.model('Homework', homeworkSchema);

export default Homework;