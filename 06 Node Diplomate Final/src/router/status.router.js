import express from "express";
import getPingController from "../controllers/status.controller.js";

const statusRouter = express.Router();

//Las rutas solo se encargan de redirigir las peticiones a los controladores

// * ------------------ Ruta PING ------------------>
statusRouter.get("/ping", getPingController)
  
  export default statusRouter;