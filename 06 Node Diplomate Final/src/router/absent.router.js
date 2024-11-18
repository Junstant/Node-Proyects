import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createAbsent, getAllAbsents, updateAbsent, deleteAbsent} from "../controllers/absent.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const absentRouter = express.Router();

// ^ ------------------ Controladores ------------------>
absentRouter.use(vApiKeyMid);
absentRouter.use(vTokenMid);
absentRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear horario ------------------>
absentRouter.post('/', createAbsent);

// * ------------------ Actualizar horario ------------------>
absentRouter.put('/', updateAbsent);

// * ------------------ Eliminar horario ------------------>
absentRouter.delete('/', deleteAbsent);

// * ------------------ Obtener todos los horarios ------------------>
absentRouter.get('/', getAllAbsents);

export default absentRouter;