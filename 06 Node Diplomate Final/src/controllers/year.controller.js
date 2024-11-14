import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from '../dataBase/models.js';

// ~ ------------------------------------> Create year <------------------------------------ ~
const createYear = async (req, res) => {
    const {year} = req.body;
  
    try {
      // Creamos el año y le pasamos los modulos
      const newYear = new db.Year({
        year,
        modules: [],
      });
  
      // Guardamos el año
      const savedYear = await newYear.save();
  
      // Crear respuesta
      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(201)
        .setMessage("Year created successfully")
        .setPayload({
          year: savedYear,
        })
        .build();
  
      // Enviar respuesta
      console.warn('[Year.Controller.Create] - Year created successfully');
      return res.status(201).json(response);
    }

    // ! ----> Si algo sale mal
    catch (error) {
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();
    console.error("[Year.Controller] - " + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update year <------------------------------------ ~
// * Actualizar año y le paso los modulos y el año por parametros desde otra funcion
const updateYear = async (yearNumber, moduleId) => {
    try {
        // Buscar el año
        const yearToUpdate = await db.Year.findOne({ year: yearNumber });

        if (!yearToUpdate) {
            throw new Error('[Year.Controller.Update] - Year not found');
        }
        
        // Actualizar el año
        yearToUpdate.modules.push(moduleId);
        const updatedYear = await yearToUpdate.save();
    
        // Crear respuesta
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Year updated successfully")
        .setPayload({
            year: updatedYear,
        })
        .build();
    
        // Enviar respuesta
        console.warn('[Year.Controller.Update] - Year updated successfully');
        return response;
    }
    
    // ! ----> Si algo sale mal
    catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Server Error")
        .setPayload({
            detail: error.message,
        })
        .build();
        console.error("[Year.Controller] - " + error.message);
        return response;
    }
}
// ~ ------------------------------------> Delete year <------------------------------------ ~
const deleteYear = async (req, res) => {
    const {year} = req.body;
    
    try {
        // Eliminar el año
        const deletedYear = await db.Year.findOneAndDelete({ year });
    
        // Crear respuesta
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Year deleted successfully")
        .setPayload({
            year: deletedYear,
        })
        .build();
    
        // Enviar respuesta
        console.warn('[Year.Controller.Delete] - Year deleted successfully');
        return res.status(200).json(response);
    }
    
    // ! ----> Si algo sale mal
    catch (error) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Server Error")
        .setPayload({
            detail: error.message,
        })
        .build();
        console.error("[Year.Controller] - " + error.message);
        return res.status(500).json(response);
    }
};

export { createYear, updateYear ,deleteYear };