import express from "express";
import getPingController from "../controllers/status.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";


const statusRouter = express.Router();

//Las rutas solo se encargan de redirigir las peticiones a los controladores

// * ------------------ Ruta PING ------------------>
statusRouter.get("/ping", getPingController)

// * ------------------ Rutas Protegidas ------------------>
statusRouter.get("/protected/ping", vTokenMid, getPingController)
  
  export default statusRouter;