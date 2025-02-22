import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createYear, deleteYear, getAllYears} from "../controllers/year.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const yearRouter = express.Router();

// ^ ------------------ Controladores ------------------>
yearRouter.use(vApiKeyMid);
yearRouter.use(vTokenMid);
yearRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear año ------------------>
yearRouter.post('/', createYear);

// * ------------------ Eliminar año ------------------>
yearRouter.put('/', deleteYear);

// * ------------------ Obtener todos los años ------------------>
yearRouter.get('/', getAllYears);

export default yearRouter;