import express from "express";
import vRoleMid from "../middlewares/role.middleware.js";
import vApiKeyMid from "../middlewares/apiKey.middleware.js";
import {createNote, getAllNotes, updateNote, deleteNote} from "../controllers/notes.controller.js";
import vTokenMid from "../middlewares/auth.middleware.js";

const notesRouter = express.Router();

// ^ ------------------ Controladores ------------------>
notesRouter.use(vApiKeyMid);
notesRouter.use(vTokenMid);
notesRouter.use(vRoleMid(["user", "admin"]));

// * ------------------ Crear notas ------------------>
notesRouter.post('/', createNote);

// * ------------------ Actualizar notas ------------------>
notesRouter.put('/', updateNote);

// * ------------------ Eliminar notas ------------------>
notesRouter.delete('/', deleteNote);

// * ------------------ Obtener todas las notas ------------------>
notesRouter.get('/', getAllNotes);

export default notesRouter;