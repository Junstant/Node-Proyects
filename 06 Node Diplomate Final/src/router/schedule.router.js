import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createSchedule, getAllSchedules, deleteSchedule, updateSchedule } from "../controllers/schedule.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const scheduleRouter = express.Router();

// ^ ------------------ Controladores ------------------>
// scheduleRouter.use(vApiKeyMid);
// scheduleRouter.use(vTokenMid);
// scheduleRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear horario ------------------>
scheduleRouter.post('/', createSchedule);

// * ------------------ Actualizar horario ------------------>
scheduleRouter.put('/', updateSchedule);

// * ------------------ Eliminar horario ------------------>
scheduleRouter.delete('/', deleteSchedule);

// * ------------------ Obtener todos los horarios ------------------>
scheduleRouter.get('/', getAllSchedules);

export default scheduleRouter;
