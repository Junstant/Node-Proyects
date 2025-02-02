import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import absentModule from "../repositories/absent.repository.js";

// ~ ------------------------------------> Create absent <------------------------------------ ~
const createAbsent = async (req, res) => {
  // Extraer datos del body
  const { absents, moduleId } = req.body;
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
      console.error('[Absent.Controller.Create] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({absents});

    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Absent.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newAbsent = await absentModule.createAbsent(moduleId, absents);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Absent created successfully")
      .setPayload({
        absent: newAbsent,
      })
      .build();

    // Enviar respuesta
    console.warn('[Absent.Controller.Create] - Absent created successfully');
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
    console.error('[Absent.Controller.Create] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all absents <------------------------------------ ~
const getAllAbsents = async (req, res) => {
    const {moduleId} = req.query;
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!moduleId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Module Id is required")
        .setPayload({
          detail: "Module Id is required",
        })
        .build();

      // Enviar respuesta de error
      console.error('[Absent.Controller.GetAll] - Module Id is required');
      return res.status(400).json(response);
    }


    // ^ --------------> Obtener todos los módulos
    const absents = await absentModule.getAllAbsents(moduleId);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Absents retrieved successfully")
      .setPayload({
        absents,
      })
      .build();

    // Enviar respuesta
    console.warn('[Absent.Controller.GetAll] - Absents retrieved successfully');
    return res.status(200).json(response);
    
  } 

  //! ----> Si hay un error en el proceso
  catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error" + error.message)
      .setPayload({
        detail: error.message,
      })
      .build();

    // Enviar respuesta de error
    console.error('[Absent.Controller.GetAll] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update absent <------------------------------------ ~
const updateAbsent = async (req, res) => {
  // Extraer datos del body
  const { absent, id } = req.body;
  console.log(absent);
  console.log(id);
  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!id){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Absent Id is required")
        .setPayload({ detail: "Absent Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Absent.Controller.Update] - Absent Id is required');
      return res.status(400).json(response);
    }


    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(absent);

    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Absent.Controller.Update] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Actualizar el módulo
    const updatedAbsent = await absentModule.updateAbsent(id,absent);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Absent updated successfully")
      .setPayload({
        absent: updatedAbsent,
      })
      .build();

    // Enviar respuesta
    console.warn('[Absent.Controller.Update] - Absent updated successfully');
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
    console.error('[Absent.Controller.Update] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Delete absent <------------------------------------ ~
const deleteAbsent = async (req, res) => {
  // Extraer datos del body
  const { moduleId, id } = req.body;

  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!id){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Absent Id is required")
        .setPayload({ detail: "Absent Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Absent.Controller.Delete] - Absent Id is required');
      return res.status(400).json(response);
    }

    //! ---> Si no se envía el id, lanzar un error
    if(!moduleId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Module Id is required")
        .setPayload({ detail: "Module Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Absent.Controller.Delete] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Eliminar el módulo
    const deletedAbsent = await absentModule.removeAbsent(moduleId, id);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Absent deleted successfully")
      .setPayload({
        absent: deletedAbsent,
      })
      .build();

    // Enviar respuesta
    console.warn('[Absent.Controller.Delete] - Absent deleted successfully');
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
    console.error('[Absent.Controller.Delete] - ' + error.message);
    return res.status(500).json(response);
  }
};

export {createAbsent, getAllAbsents, updateAbsent, deleteAbsent};