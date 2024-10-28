import mongoose from "mongoose";

//parametros de conexion a la base de datos
const DB_URL = "mongodb://localhost:27017";
const DB_NAME = "APP_Prueba";
const DB_CONNECTION = `${DB_URL}/${DB_NAME}`;

//conexion a la base de datos
mongoose.connect(DB_CONNECTION);

const database = mongoose.connection;

//verificacion de la conexion y mensaje de exito
database.once("open", () => {
  console.log("Database connected!");
});

//verificacion de la conexion y mensaje de error
database.on("error", (error) => {
  console.error(error);
});


//exportacion de la conexion
export {mongoose, database};