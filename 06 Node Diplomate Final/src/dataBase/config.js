import mongoose from "mongoose";
import ENVIROMENT from "../config/enviroment.config.js";

//conexión a la base de datos
mongoose.connect(ENVIROMENT.DB_URI)
.then(() => {
    console.warn("Connected to the database");
})

//Error si no se conecta
.catch((error) => {
  console.log("Error connecting to the database: ", error);
});

export default mongoose;