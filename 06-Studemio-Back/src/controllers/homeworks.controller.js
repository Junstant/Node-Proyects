import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import homeworkModule from "../repositories/homework.repository.js";

// ~ ------------------------------------> Create homework <------------------------------------ ~
const createHomework = async (req, res) => {
  // Extraer datos del body
  const { homeworks, moduleId } = req.body;
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!moduleId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Module Id is required")
        .setPayload({ detail: "Module Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Homework.Controller.Create] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({homeworks});
    
    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Homework.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newHomework = await homeworkModule.createHomework(moduleId, homeworks);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Homework created successfully")
      .setPayload({
        homeworks: newHomework,
      })
      .build();

    // Enviar respuesta
    console.warn('[Homework.Controller.Create] - Homework created successfully');
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
    console.error('[Homework.Controller.Create] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all homeworks <------------------------------------ ~
const getAllHomeworks = async (req, res) => {
    const {moduleId} = req.body;
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!moduleId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Module Id is required")
        .setPayload({ detail: "Module Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Homework.Controller.GetAll] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Obtener todos los módulos
    const homeworks = await homeworkModule.getAllHomeworks(moduleId);
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Homeworks found")
      .setPayload({
        homeworks,
      })
      .build();

    // Enviar respuesta
    console.warn('[Homework.Controller.GetAll] - Homeworks found');
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
    console.error('[Homework.Controller.GetAll] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update note <------------------------------------ ~
const updateHomework = async (req, res) => {
  // Extraer datos del body
  const { homework, id } = req.body;
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!id){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Homework Id is required")
        .setPayload({ detail: "Homework Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Homework.Controller.Update] - Homework Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({homework});
    
    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Homework.Controller.Update] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Actualizar la tarea
    const updatedHomework = await homeworkModule.updateHomework(id, homework);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Homework updated successfully")
      .setPayload({
        homework: updatedHomework,
      })
      .build();

    // Enviar respuesta
    console.warn('[Homework.Controller.Update] - Homework updated successfully');
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
    console.error('[Homework.Controller.Update] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Remove homework <------------------------------------ ~
const removeHomework = async (req, res) => {
  // Extraer datos del body
  const { id, moduleId } = req.body;
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!id){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Homework Id is required")
        .setPayload({ detail: "Homework Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Homework.Controller.Remove] - Homework Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Eliminar la tarea
    const removedHomework = await homeworkModule.removeHomework(moduleId, id);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Homework removed successfully")
      .setPayload({
        homework: removedHomework,
      })
      .build();

    // Enviar respuesta
    console.warn('[Homework.Controller.Remove] - Homework removed successfully');
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
    console.error('[Homework.Controller.Remove] - ' + error.message);
    return res.status(500).json(response);
  }
};

export { createHomework, getAllHomeworks, updateHomework, removeHomework };