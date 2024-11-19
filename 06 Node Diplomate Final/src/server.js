import express from "express";
import statusRouter from "./router/status.router.js";
import ENVIROMENT from "./config/enviroment.config.js";
import authRouter from "./router/auth.router.js";
import cors from "cors";
import modulesRouter from "./router/modules.router.js";
import yearRouter from "./router/year.router.js";
import careerRouter from "./router/career.router.js";
import scheduleRouter from "./router/schedule.router.js";
import absentRouter from "./router/absent.router.js";
import notesRouter from "./router/notes.router.js";
import homeworksRouter from "./router/homeworks.router.js";

//Las responsabilidades se deben separar en las siguientes capas:
// # Capa de controladores: Se encarga de manejar las peticiones HTTP, procesar la información (validandolos) y enviar una respuesta al cliente.
// # Capa de rutas: Se encarga de redirigir las peticiones a los controladores.
// # Capa de servicios: Se encarga de la lógica de negocio.
// # Capa de repositorios: Se encarga de la interacción con la base de datos.

// * Database connection
import DBconnection from "./dataBase/config.js";



// * -----------------------------------------> Server configuration ---------------------------->
const app = express();
const PORT = ENVIROMENT.PORT || 3000;

// * ------> MiddleWare CORS Config disable
app.use(cors());

// * ------> MiddleWare JSON Config
app.use(express.json({extended: true}));

// * ------> Enrutadores
app.use('/api/status', statusRouter);
app.use('/api/auth', authRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/year', yearRouter);
app.use('/api/career', careerRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/absent', absentRouter);
app.use('/api/notes', notesRouter);
app.use('/api/homeworks', homeworksRouter);

// * ------> Database connection message
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
