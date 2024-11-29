import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createModule, updateModule, deleteModule, getAllModules, getDependencies} from "../controllers/modules.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const modulesRouter = express.Router();

// ^ ------------------ Controladores ------------------>
modulesRouter.use(vApiKeyMid);
modulesRouter.use(vTokenMid);
modulesRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear materia ------------------>
modulesRouter.post('/', createModule);

// * ------------------ Actualizar materia ------------------>
modulesRouter.put('/', updateModule);

// * ------------------ Eliminar materia ------------------>
modulesRouter.put('/delete', deleteModule);

// * ------------------ Obtener todas las materias ------------------>
modulesRouter.get('/', getAllModules);

// * ------------------ Obtener dependencias por id ------------------>
modulesRouter.get('/dependencies', getDependencies);

export default modulesRouter;