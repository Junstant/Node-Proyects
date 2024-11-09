import express from "express";
import {registerUserController, verifyMailController, loginUserController, forgotPasswordController, resetPasswordController} from "../controllers/auth.controller.js";

const authRouter = express.Router();


// * ------------------ Ruta de registro ------------------>
authRouter.post('/register', registerUserController);

// * ------------------ Ruta de verificacion ------------------>
authRouter.get('/verify/:token', verifyMailController);

// * ------------------ Ruta de login ------------------>
authRouter.post('/login', loginUserController);

// * ------------------ Ruta de forgot password ------------------>
authRouter.post('/forgot-password', forgotPasswordController);

// * ------------------ Ruta de reset password ------------------>
authRouter.put('/reset-password/:token', resetPasswordController);

export default authRouter;