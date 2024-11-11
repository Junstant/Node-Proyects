import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
    'year':{ //# año de la carrera
        type: string,
        enum: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
        required: true,
    },
    'modules':[{ //:: array de objetos que tienen IDs y nombres que son requisito para esta materia
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module', // Referencia al modelo Module
        required: false
    }],
});

// * ---------> Exportamos el modelo
const Year = mongoose.model('Year', yearSchema);

export default Year;