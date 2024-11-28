import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import ModuleRepository from "../repositories/module.repository.js";

// ~ ------------------------------------> Create module <------------------------------------ ~
const createModule = async (req, res) => {
  // Extraer datos del body
  const { yearId } = req.body;

  try {
    //! ----> Si no se envía el id del año
    if(!yearId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Year Id is required")
        .setPayload({ detail: "Year Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Modules.Controller.Create] - Year Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Crear el módulo
    const newModule = await ModuleRepository.createModule(yearId);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Module created successfully")
      .setPayload({
        module: newModule,
      })
      .build();
    
    // Enviar respuesta
    console.warn('[Modules.Controller.Create] - Module created successfully');
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
    console.error('[Modules.Controller.Create] - ' + error.message);
    return res.status(500).json(response);
  }
};

  // ~ ------------------------------------> Update module <------------------------------------ ~
  const updateModule = async (req, res) => {
    // Extraer datos del body
    const {moduleId, name, scheduleId, location, proffesor, dependencies, state, absentsId, period, notesId, homeworksId, color} = req.body;

    try {

      //! ----> Si no se envía el id del módulo
      console.log(moduleId);

      if(!moduleId){
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(400)
          .setMessage("Module Id is required")
          .setPayload({ detail: "Module Id is required" })
          .build();

        // Enviar respuesta de error
        console.error('[Modules.Controller.Update] - Module Id is required');
        return res.status(400).json(response);
      }

      // ^ --------------> Enviar los datos a la función de validación
      const Validations = modulesValidations({name, location, proffesor, dependencies, state, period, color});

      // ^ --------------> Validar si hay errores
      if(Validations.getOk() === false){
        console.error('[Modules.Controller.Update] - Validation error');
        return res.status(400).json(Validations.response);
      }

      // ^ --------------> Actualizar el módulo
      const dataToUpdate = {name, scheduleId, location, proffesor, dependencies, state, absentsId, period, notesId, homeworksId, color};
      
      // ^ --------------> Enviar los datos a la función de actualización
      const updatedModule = await ModuleRepository.updateModule(moduleId, dataToUpdate);

      // Crear respuesta
      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Module updated successfully")
        .setPayload({
          module: updatedModule,
        })
        .build();

      // Enviar respuesta
      console.warn('[Modules.Controller.Update] - Module updated successfully');
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
      console.error('[Modules.Controller.Update] - ' + error.message);
      return res.status(500).json(response);
    }
  };

// ~ ------------------------------------> Delete module <------------------------------------ ~
const deleteModule = async (req, res) => {
  // Extraer datos del body
  const { yearId, moduleId } = req.body;

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
      console.error('[Modules.Controller.Delete] - Module Id is required');
      return res.status(400).json(response);
    }

    //! ----> Si no se envía el id del año
    if(!yearId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Year Id is required")
        .setPayload({ detail: "Year Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Modules.Controller.Delete] - Year Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Eliminar el módulo
    const deletedModule = await ModuleRepository.deleteModule(yearId, moduleId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Module deleted successfully")
      .setPayload({
        module: deletedModule,
      })
      .build();

    // Enviar respuesta
    console.warn('[Modules.Controller.Delete] - Module deleted successfully');
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
    console.error('[Modules.Controller.Delete] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all moudules of a year<------------------------------------ ~
const getAllModules = async (req, res) => {
  // Extraer datos del body
  const { yearId } = req.query;

  try {
    
    //! ----> Si no se envía el id del año
    if(!yearId){
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Year Id is required")
        .setPayload({ detail: "Year Id is required" })
        .build();

      // Enviar respuesta de error
      console.error('[Modules.Controller.GetAll] - Year Id is required');
      return res.status(400).json(response);
    }

    // ^ --------------> Obtener todos los módulos
    const modules = await ModuleRepository.getAllModules(yearId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Modules retrieved successfully")
      .setPayload({
        modules,
      })
      .build();

    // Enviar respuesta
    console.warn('[Modules.Controller.GetAll] - Modules retrieved successfully');
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
    console.error('[Modules.Controller.GetAll] - ' + error.message);
    return res.status(500).json(response);
  }
};

export { createModule, updateModule, deleteModule, getAllModules };
