import mongoose from 'mongoose';
import Year from './years.model.js';

const careerSchema = new mongoose.Schema({
    name: { // # Nombre de la carrera
        type: String,
        required: true,
    },
    years: [{ // :: Años y sus respectivas materias
        type: mongoose.Schema.Types.ObjectId,
        ref: Year,
    }],
});

// * ---------> Exportamos el modelo
const Career = mongoose.model('Career', careerSchema);

export default Career;