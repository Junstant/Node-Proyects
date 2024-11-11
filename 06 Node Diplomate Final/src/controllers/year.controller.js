import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from '../dataBase/models.js';

// ~ ------------------------------------> Create year <------------------------------------ ~
const createYear = async (req, res) => {
    const { year, modules } = req.body;
  
    try {
      //Conseguir los ids de moongoose de los modulos
      const moduleIds = modules.map((module) => module._id);

      // Creamos el año y le pasamos los modulos
      const newYear = new db.Year({
        year,
        modules: null,
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

// ~ ------------------------------------> Delete year <------------------------------------ ~
const deleteYear = async (req, res) => {
    const { yearId } = req.params;
    
    try {
        // Eliminar el año
        const deletedYear = await db.Year.findByIdAndDelete(yearId);
    
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

export { createYear, deleteYear };