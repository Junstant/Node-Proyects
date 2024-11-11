import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createModule, updateModule, deleteModule} from "../controllers/modules.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const modulesRouter = express.Router();

// ^ ------------------ Controladores ------------------>
modulesRouter.use(vApiKeyMid);
modulesRouter.use(vTokenMid);
modulesRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear materia ------------------>
modulesRouter.post('/', createModule);

// * ------------------ Actualizar materia ------------------>
modulesRouter.put('/:id', updateModule);

// * ------------------ Eliminar materia ------------------>
modulesRouter.delete('/:id', deleteModule);

export default modulesRouter;