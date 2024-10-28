import express from "express";
import {registerUserController, verifyMailController, loginUserController} from "../controllers/auth.controller.js";

const authRouter = express.Router();


// * ------------------ Ruta de registro ------------------>
authRouter.post('/register', registerUserController);

// * ------------------ Ruta de verificacion ------------------>
authRouter.get('/verify/:token', verifyMailController);

// * ------------------ Ruta de login ------------------>
// authRouter.post('/login', ;)

// * ------------------ Ruta de forgot password ------------------>
// authRouter.post('/forgot-password', ;)

export default authRouter;