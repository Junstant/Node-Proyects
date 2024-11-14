import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import modulesValidations from "../utils/modulesValidation.util.js";
import ModuleRepository from "../repositories/module.repository.js";
import YearRepository from "../repositories/year.repository.js";

// ~ ------------------------------------> Create module <------------------------------------ ~
const createModule = async (req, res) => {
  // Extraer datos del body
  const { name, schedule, location, proffesor, dependencies, state, period, index, Year } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(name, schedule, location, proffesor, dependencies, state, period);

    // ^ --------------> Validar si hay errores
    if(Validations.response.ok === false){
      console.error('[Modules.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Crear el módulo
    const newModule = await ModuleRepository.createModule(name, schedule, location, proffesor, dependencies, state, period, index, Year);
    
    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Module created successfully")
      .setPayload({
        module: newModule,
      })
      .build();

    //% -------------------> Actualizamos el año en el que se encuentra el módulo
    const updatedYear = await YearRepository.updateYear(Year, newModule._id);
    

    if(!updatedYear){
      console.error('[Modules.Controller.Create] - Error updating year');
      return res.status(500).json(updatedYear.response);
    }

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
  const { id, name, schedule, location, proffesor, dependencies, state, absents, period, notes, homeworks, index, Year } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(name, schedule, location, proffesor, dependencies, state, absents, period, notes, homeworks);

    // ^ --------------> Validar si hay errores
    if(Validations.setOk === false){
      console.error('[Modules.Controller.Update] - Validation error');
      return res.status(400).json(Validations.response);
    }

    // ^ --------------> Actualizar el módulo
    const updatedModule = await ModuleRepository.updateModule(id, name, schedule, location, proffesor, dependencies, state, absents, period, notes, homeworks, index, Year);

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
  const { id } = req.body;

  try {
    // ^ --------------> Eliminar el módulo
    const deletedModule = await ModuleRepository.deleteModule(id);

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

export { createModule, updateModule, deleteModule };
