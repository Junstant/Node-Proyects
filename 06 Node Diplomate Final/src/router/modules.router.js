import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import getProducts from "../controllers/modules.controller.js";

const modulesRouter = express.Router();

// ^ ------------------ Controladores ------------------>
modulesRouter.use(vApiKeyMid);
modulesRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Ver materias ------------------>
modulesRouter.get('/', getProducts);

// // * ------------------ Ver materias por ID ------------------>
// modulesRouter.get('/:id', modulesController);

// // * ------------------ Crear materia ------------------>
// modulesRouter.post('/', modulesController);

// // * ------------------ Actualizar materia ------------------>
// modulesRouter.put('/:id', modulesController);

// // * ------------------ Eliminar materia ------------------>
// modulesRouter.delete('/:id', modulesController);

export default modulesRouter;