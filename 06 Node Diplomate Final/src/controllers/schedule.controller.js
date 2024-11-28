import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import scheduleModule from "../repositories/schedule.repository.js";

// ~ ------------------------------------> Create Schedule <------------------------------------ ~
const createSchedule = async (req, res) => {
  // Extraer datos del body
  const { schedule, moduleId } = req.body;

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
      console.error('[Schedule.Controller.Create] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({schedule});

    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Schedule.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newSchedule = await scheduleModule.createSchedule(schedule, moduleId);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Schedule created successfully")
      .setPayload({
        schedule: newSchedule,
      })
      .build();

    // Enviar respuesta
    console.warn('[Schedule.Controller.Create] - Schedule created successfully');
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
    console.error('[Schedule.Controller.Create] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all schedules <------------------------------------ ~
const getAllSchedules = async (req, res) => {
    const {moduleId} = req.query;
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
      console.error('[Schedule.Controller.GetAll] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Obtener todos los módulos
    const schedules = await scheduleModule.getAllSchedules(moduleId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Schedules found")
      .setPayload({
        schedules,
      })
      .build();

    // Enviar respuesta
    console.warn('[Schedule.Controller.GetAll] - Schedules found');
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
    console.error('[Schedule.Controller.GetAll] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Delete schedule <------------------------------------ ~
const deleteSchedule = async (req, res) => {
  // Extraer datos del body
  const { id, moduleId } = req.body;

  try {
    //! ----> Si no se envía el id del módulo
    if(!moduleId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Module Id is required")
        .setPayload({ detail: "Module Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Schedule.Controller.Delete] - Module Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Eliminar el módulo
    const deletedSchedule = await scheduleModule.removeSchedule(id, moduleId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Schedule deleted successfully")
      .setPayload({
        schedule: deletedSchedule,
      })
      .build();

    // Enviar respuesta
    console.warn('[Schedule.Controller.Delete] - Schedule deleted successfully');
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
    console.error('[Schedule.Controller.Delete] - Internal Server Error');
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update schedule <------------------------------------ ~
const updateSchedule = async (req, res) => {
  // Extraer datos del body
  const { id, schedule } = req.body;

  try {
    //! ---> Si no se envía el id, lanzar un error
    if(!id){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Schedule Id is required")
        .setPayload({ detail: "Schedule Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Schedule.Controller.Update] - Schedule Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(schedule);

    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Schedule.Controller.Update] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Actualizar el módulo
    const updatedSchedule = await scheduleModule.updateSchedule(id, schedule);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Schedule updated successfully")
      .setPayload({
        schedule: updatedSchedule,
      })
      .build();

    // Enviar respuesta
    console.warn('[Schedule.Controller.Update] - Schedule updated successfully');
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
    console.error('[Schedule.Controller.Update] - Internal Server Error');
    return res.status(500).json(response);
  }
};

export {createSchedule, getAllSchedules, deleteSchedule, updateSchedule};