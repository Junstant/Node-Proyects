//Aqui tendremos el modelo del usuario
import mongoose from 'mongoose';


//* ---------> Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

//* ---------> Exportamos el modelo
const User = mongoose.model('User', userSchema);

export default User;