import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import ModuleRepository from "../repositories/module.repository.js";

// ~ ------------------------------------> Create module <------------------------------------ ~
const createModule = async (req, res) => {
  // Extraer datos del body
  const { year } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations({year});

    // ^ --------------> Validar si hay errores
    if(Validations.getOk() === false){
      console.error('[Modules.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newModule = await ModuleRepository.createModule(year);
    
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
    const {moduleId, name, scheduleId, location, proffesor, dependencies, state, absentsId, period, notesId, homeworksId} = req.body;

    try {
      // ^ --------------> Enviar los datos a la función de validación
      const Validations = modulesValidations({name, location, proffesor, dependencies, state, period});

      // ^ --------------> Validar si hay errores
      if(Validations.getOk() === false){
        console.error('[Modules.Controller.Update] - Validation error');
        return res.status(400).json(Validations.response);
      }

      // ^ --------------> Actualizar el módulo
      const dataToUpdate = {name, scheduleId, location, proffesor, dependencies, state, absentsId, period, notesId, homeworksId};
      
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
  const { year, moduleId } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(year);

    if(Validations.setOk === false){
      console.error('[Modules.Controller.Delete] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Eliminar el módulo
    const deletedModule = await ModuleRepository.deleteModule(year, moduleId);

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
  const { year } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(year);

    if(Validations.setOk === false){
      console.error('[Modules.Controller.Delete] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Obtener todos los módulos
    const modules = await ModuleRepository.getAllModules(year);

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