import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from "../dataBase/models.js";
import YearRepository from "../repositories/year.repository.js";

// ~ ------------------------------------> Create year <------------------------------------ ~
const createYear = async (req, res) => {
  const { year, careerId } = req.body;

  try {
    //! ---> Si la carrera no existe, lanzar un error
    if (!careerId) {
      const response = new ResponseBuilder().setOk(false).setStatus(400).setMessage("Career is required").build();
      // Enviar respuesta
      console.error("[Year.Controller.Create] - Career is required");
      return res.status(400).json(response);
    }

    //! ---> Si no se envía el año o no es un numero, lanzar un error
    if (!year || isNaN(year)) {
      const response = new ResponseBuilder().setOk(false).setStatus(400).setMessage("Year is required and must be a number").build();
      // Enviar respuesta
      console.error("[Year.Controller.Create] - Year is required and must be a number");
      return res.status(400).json(response);
    }

    //^ -----> Creamos el año y lo guardamos
    const savedYear = await YearRepository.createYear(year, careerId);

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
    console.warn("[Year.Controller.Create] - Year created successfully");
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
  const { year, careerId } = req.body;

  try {
    // Eliminar el año
    const deletedYear = await YearRepository.removeYear(year, careerId);

    if (!deletedYear) {
      const response = new ResponseBuilder().setOk(false).setStatus(404).setMessage("Year not found").build();
      // Enviar respuesta
      console.error("[Year.Controller.Delete] - Year not found");
      return res.status(404).json(response);
    }

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
    console.warn("[Year.Controller.Delete] - Year deleted successfully");
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
