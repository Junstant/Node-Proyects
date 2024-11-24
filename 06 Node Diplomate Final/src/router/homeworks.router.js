import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import { createHomework, getAllHomeworks, updateHomework, removeHomework } from "../controllers/homeworks.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const homeworksRouter = express.Router();

// ^ ------------------ Controladores ------------------>
homeworksRouter.use(vApiKeyMid);
homeworksRouter.use(vTokenMid);
homeworksRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear tarea ------------------>
homeworksRouter.post('/', createHomework);

// * ------------------ Actualizar tarea ------------------>
homeworksRouter.put('/', updateHomework);

// * ------------------ Eliminar tarea ------------------>
homeworksRouter.delete('/', removeHomework);

// * ------------------ Obtener todas las tareas ------------------>
homeworksRouter.get('/', getAllHomeworks);

export default homeworksRouter;