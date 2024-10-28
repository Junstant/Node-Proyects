import { mongoose } from "../config/mongoDB.config.js";

/* Mongoose trae schemas*/ //Este schema permite que si intentamos agregar una propiedad que no existe, va hacer todo menos agregar esa propiedad
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  });
  
  const User = mongoose.model("User", userSchema);

export default User;