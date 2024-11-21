import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createCareer, deleteCareer, getAllCareers,updateCareer} from "../controllers/career.controller.js";   
import vTokenMid from "../middlewares/auth.middleware.js";

const careerRouter = express.Router();

// ^ ------------------ Controladores ------------------>
// careerRouter.use(vApiKeyMid);
// careerRouter.use(vTokenMid);
// careerRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear carrera ------------------>
careerRouter.post('/', createCareer);

// * ------------------ Eliminar carrera ------------------>
careerRouter.delete('/', deleteCareer);

// * ------------------ Actualizar carrera ------------------>
careerRouter.put('/', updateCareer);

// * ------------------ Obtener todas las carreras ------------------>
careerRouter.get('/', getAllCareers);

export default careerRouter;