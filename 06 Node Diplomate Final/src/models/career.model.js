import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    name: { // # Nombre de la carrera
        type: String,
        required: true,
    },
    years: [{ // #:: Años y sus respectivas materias
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
    }],
});

// * ---------> Exportamos el modelo
const Career = mongoose.model('Career', careerSchema);

export default Career;