import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from '../dataBase/models.js';

// ~ ------------------------------------> Create career <------------------------------------ ~
const createCareer = async (req, res) => {
    const {name} = req.body;
  
    try {
      // Creamos la carrera y le pasamos los años
      const newCareer = new db.Career({
        name,
        years: [],
      });
  
      // Guardamos la carrera
      const savedCareer = await newCareer.save();
  
      // Crear respuesta
      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(201)
        .setMessage("Career created successfully")
        .setPayload({
          career: savedCareer,
        })
        .build();
  
      // Enviar respuesta
      console.warn('[Career.Controller.Create] - Career created successfully');
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
    console.error("[Career.Controller] - " + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update career <------------------------------------ ~
// * Actualizar carrera y le paso los años y la carrera por parametros desde otra funcion
const updateCareer = async (careerName, yearId) => {
    try {
        // Buscar la carrera
        const careerToUpdate = await db.Career.findOne({ name: careerName });

        if (!careerToUpdate) {
            throw new Error('[Career.Controller.Update] - Career not found');
        }

        // Actualizar la carrera
        careerToUpdate.years.push(yearId);
        const updatedCareer = await careerToUpdate.save();

        // Crear respuesta
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Career updated successfully")
        .setPayload({
            career: updatedCareer,
        })
        .build();

        // Enviar respuesta
        console.warn('[Career.Controller.Update] - Career updated successfully');
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
    console.error("[Career.Controller] - " + error.message);
    return response;
}
}

// ~ ------------------------------------> Delete career <------------------------------------ ~
const deleteCareer = async (req, res) => {
    const { name } = req.body;

    try {
        // Buscar la carrera
        const careerToDelete = await db.Career.findOne({ name });

        if (!careerToDelete) {
            throw new Error('[Career.Controller.Delete] - Career not found');
        }

        // Eliminar la carrera
        const deletedCareer = await careerToDelete.deleteOne();

        // Crear respuesta
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("Career deleted successfully")
        .setPayload({
            career: deletedCareer,
        })
        .build();

        // Enviar respuesta
        console.warn('[Career.Controller.Delete] - Career deleted successfully');
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
        console.error("[Career.Controller] - " + error.message);
        return res.status(500).json(response);
    }
};

export { createCareer, updateCareer, deleteCareer };