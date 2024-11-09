import express from "express";
import {registerUserController, verifyMailController, loginUserController, forgotPasswordController, resetPasswordController} from "../controllers/auth.controller.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
const authRouter = express.Router();


// * ------------------ Ruta de registro ------------------>
authRouter.post('/register', vApiKeyMid ,registerUserController);

// * ------------------ Ruta de verificacion ------------------>
authRouter.get('/verify/:token', verifyMailController);

// * ------------------ Ruta de login ------------------>
authRouter.post('/login', vApiKeyMid ,loginUserController);

// * ------------------ Ruta de forgot password ------------------>
authRouter.post('/forgot-password', vApiKeyMid ,forgotPasswordController);

// * ------------------ Ruta de reset password ------------------>
authRouter.put('/reset-password/:token', vApiKeyMid ,resetPasswordController);

export default authRouter;