import express from "express";
import getPingController from "../controllers/status.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import vRoleMid from "../middlewares/role.middleware.js";

//# Las rutas solo se encargan de redirigir las peticiones a los controladores
const statusRouter = express.Router();

//^ ROLES: 'admin', 'user'

// * ------------------ Validar API KEY ------------------>
statusRouter.use(vApiKeyMid);

// * ------------------ Ruta PING ------------------>
statusRouter.get("/ping", getPingController)

// * ------------------ Rutas Protegidas ------------------>
statusRouter.get("/protected/ping", vTokenMid, vRoleMid(["admin","user"]), getPingController)
  
  export default statusRouter;