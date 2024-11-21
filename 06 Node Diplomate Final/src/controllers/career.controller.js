import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import CareerRepository from "../repositories/career.repository.js";

// ~ ------------------------------------> Create career <------------------------------------ ~
const createCareer = async (req, res) => {
  // Extraer datos del body
  const { userId, name } = req.body;

  try {
    //! ---> Validar si los campos requeridos están presentes
    if (!userId || !name) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Missing required fields")
        .build();

      console.error("[Career.Controller.Create] - Missing required fields (name or userId)");
      return res.status(400).json(response);
    }

    //! ---> Si el name no es un string
    if (typeof name !== "string") {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Invalid name field")
        .build();

      console.error("[Career.Controller.Create] - Invalid name field");
      return res.status(400).json(response);
    }

    // ^ --------------> Crear la carrera
    const newCareer = await CareerRepository.createCareer(userId, name);
    

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Career created successfully")
      .setPayload({
        career: newCareer,
      })
      .build();

    // Enviar respuesta
    console.warn("[Career.Controller.Create] - Career created successfully");
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
    console.error("[Career.Controller.Create] - " + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update career <------------------------------------ ~
const updateCareer = async (req, res) => {
  // Extraer datos del body
  const { careerId, newName } = req.body;

  try {
    //! ---> Validar si los campos requeridos están presentes
    if (!careerId || !newName) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Missing required fields")
        .build();

      console.error("[Career.Controller.Update] - Missing required fields (name or newName)");
      return res.status(400).json(response);
    }

    //! ---> Si el newName no es string
    if (typeof newName !== "string") {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Invalid name or newName field")
        .build();

      console.error("[Career.Controller.Update] - Invalid name or newName field");
      return res.status(400).json(response);
    }

    // ^ --------------> Actualizar la carrera
    const updatedCareer = await CareerRepository.updateCareer(careerId, newName);

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
    console.warn("[Career.Controller.Update] - Career updated successfully");
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
    console.error("[Career.Controller.Update] - " + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Delete career <------------------------------------ ~
const deleteCareer = async (req, res) => {
  // Extraer datos del body
  const { userId, careerId } = req.body;

  try {
    //! ---> Validar si los campos requeridos están presentes
    if (!userId || !careerId) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Missing required fields")
        .build();

      console.error("[Career.Controller.Delete] - Missing required fields (userId or careerId)");
      return res.status(400).json(response);
    }

    // ^ --------------> Eliminar la carrera
    const deletedCareer = await CareerRepository.removeCareer(userId, careerId);

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
    console.warn("[Career.Controller.Delete] - Career deleted successfully");
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
    console.error("[Career.Controller.Delete] - " + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Get all careers from a user <------------------------------------ ~
const getAllCareers = async (req, res) => {
  // Extraer datos del body
  const { userId } = req.body;

  try {
    //! ---> Validar si los campos requeridos están presentes
    if (!userId) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Missing required fields")
        .build();

      console.error("[Career.Controller.GetAll] - Missing required fields (userId)");
      return res.status(400).json(response);
    }

    // ^ --------------> Obtener todas las carreras
    const careers = await CareerRepository.getAllCareers(userId);

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Careers fetched successfully")
      .setPayload({
        careers,
      })
      .build();

    // Enviar respuesta
    console.warn("[Career.Controller.GetAll] - Careers fetched successfully");
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
    console.error("[Career.Controller.GetAll] - " + error.message);
    return res.status(500).json(response);
  }
};

export { createCareer, updateCareer, deleteCareer, getAllCareers };
