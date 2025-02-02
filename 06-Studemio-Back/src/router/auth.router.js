import express from "express";
import {registerUserController, verifyMailController, loginUserController, forgotPasswordController, resetPasswordController, verifyUserTokenController, deleteUserController ,updateUserController} from "../controllers/auth.controller.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import vTokenMid from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

// * ------------------ Ruta de registro ------------------>
authRouter.post('/register', vApiKeyMid ,registerUserController);

// * ------------------ Ruta de verificacion del correo ------------------>
authRouter.get('/verify/:token', verifyMailController);

// * ------------------ Ruta de verficacion del token ------------------>
authRouter.get('/verify-token', vApiKeyMid, vTokenMid, verifyUserTokenController);

// * ------------------ Ruta de login ------------------>
authRouter.post('/login', vApiKeyMid ,loginUserController);

// * ------------------ Ruta de forgot password ------------------>
authRouter.post('/forgot-password', vApiKeyMid ,forgotPasswordController);

// * ------------------ Ruta de update user ------------------>
authRouter.put('/update-user', vApiKeyMid ,vTokenMid, updateUserController);

// * ------------------ Ruta de reset password ------------------>
authRouter.put('/reset-password/:token', vApiKeyMid ,resetPasswordController);

// * ------------------ Ruta de delete user ------------------>
authRouter.put('/delete-user', vApiKeyMid ,vTokenMid, deleteUserController);

export default authRouter;