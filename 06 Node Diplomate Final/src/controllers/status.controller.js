//Las funciones de los controladores son las encargadas de manejar las peticiones HTTP, procesar la información (validandolos) y enviar una respuesta al cliente.
import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";

const getPingController = (req, res) => {
  //* ------> Intento de ejecutar el codigo
    try {
      // Creacion de una respuesta con la clase ResponseBuilder
      const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage("Sucess")
      .setPayload({
        message: "pong",
      })
      .build();
      
      // ? ----------- Respuesta ------->
      res.status(200).json(response);
    } 
  
  //! ------> Si falla, mando esto
    catch (error) {
      // Creacion de una respuesta con la clase ResponseBuilder
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        message: error.message,
      })
      .build();
  
      // ? ----------- Respuesta ------->
      res.status(500).json(response);
    }
  };

export default getPingController;