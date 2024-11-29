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

// * ------------------ Crear ausencia ------------------>
absentRouter.post('/', createAbsent);

// * ------------------ Actualizar ausencia ------------------>
absentRouter.put('/', updateAbsent);

// * ------------------ Eliminar ausencia ------------------>
absentRouter.put('/delete', deleteAbsent);

// * ------------------ Obtener todos las ausencias ------------------>
absentRouter.get('/', getAllAbsents);

export default absentRouter;