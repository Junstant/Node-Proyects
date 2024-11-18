import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import noteModule from "../repositories/notes.repository.js";

// ~ ------------------------------------> Create note <------------------------------------ ~
const createNote = async (req, res) => {
  // Extraer datos del body
  const { notes, moduleId } = req.body;
  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({notes});
    
    // ^ --------------> Validar si hay errores
    if(Validations.response.ok === false){
      console.error('[Note.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newNote = await noteModule.createNote(moduleId, notes);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Note created successfully")
      .setPayload({
        notes: newNote,
      })
      .build();

    // Enviar respuesta
    console.warn('[Note.Controller.Create] - Note created successfully');
    return res.status(201).json(response);
    
  } 

  //! ----> Si hay un error en el proceso
  catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    // Enviar respuesta de error
    console.error('[Note.Controller.Create] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all notes <------------------------------------ ~
const getAllNotes = async (req, res) => {
    const {moduleId} = req.body;
  try {
    // ^ --------------> Obtener todos los módulos
    const notes = await noteModule.getAllNotes(moduleId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Notes obtained successfully")
      .setPayload({
        notes,
      })
      .build();

    // Enviar respuesta
    console.warn('[Note.Controller.GetAll] - Notes obtained successfully');
    return res.status(200).json(response);
  } 

  //! ----> Si hay un error en el proceso
  catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    // Enviar respuesta de error
    console.error('[Note.Controller.GetAll] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update note <------------------------------------ ~
const updateNote = async (req, res) => {
  // Extraer datos del body
  const { noteId, note } = req.body;
  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({note});
    
    // ^ --------------> Validar si hay errores
    if(Validations.response.ok === false){
      console.error('[Note.Controller.Update] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Actualizar el módulo
    const updatedNote = await noteModule.updateNote(noteId, note);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Note updated successfully")
      .setPayload({
        note: updatedNote,
      })
      .build();

    // Enviar respuesta
    console.warn('[Note.Controller.Update] - Note updated successfully');
    return res.status(200).json(response);
  } 

  //! ----> Si hay un error en el proceso
  catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    // Enviar respuesta de error
    console.error('[Note.Controller.Update] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Delete note <------------------------------------ ~
const deleteNote = async (req, res) => {
  // Extraer datos del body
  const { noteId } = req.body;
  try {
    // ^ --------------> Eliminar el módulo
    const deletedNote = await noteModule.deleteNote(noteId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Note deleted successfully")
      .setPayload({
        note: deletedNote,
      })
      .build();

    // Enviar respuesta
    console.warn('[Note.Controller.Delete] - Note deleted successfully');
    return res.status(200).json(response);
  } 

  //! ----> Si hay un error en el proceso
  catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    // Enviar respuesta de error
    console.error('[Note.Controller.Delete] - Internal Server Error');
    return res.status(500).json(response);
  }
};

export { createNote, getAllNotes, updateNote, deleteNote };