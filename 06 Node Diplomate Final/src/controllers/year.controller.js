import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from '../dataBase/models.js';
import { updateCareer } from "./career.controller.js";
import YearRepository from "../repositories/year.repository.js";

// ~ ------------------------------------> Create year <------------------------------------ ~
const createYear = async (req, res) => {
    const {year, Career} = req.body;
  
    try {
      // Creamos el año y lo guardamos
      const savedYear = YearRepository.createYear(year);
  
      // Crear respuesta
      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(201)
        .setMessage("Year created successfully")
        .setPayload({
          year: savedYear,
        })
        .build();

      //% -------------------> Actualizamos la carrera en la que se encuentra el año
      const updatedCareer = await updateCareer(Career, savedYear._id); 
      
      if(!updatedCareer){
        console.error('[Year.Controller.Create] - Error updating career');
        return res.status(500).json(updatedCareer.response);
      }
  
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
        // Actualizar el año
        YearRepository.updateYear(yearNumber, moduleId);
        
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