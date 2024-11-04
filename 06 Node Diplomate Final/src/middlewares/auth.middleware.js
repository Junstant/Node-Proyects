import ResponseBuilder from "../utils/builders/responseBuilder.utils.js";
import ENVIROMENT from "../config/enviroment.config.js";
import jwt from "jsonwebtoken";

const vTokenMid = async (req, res, next) => {
  try {
    const auth_header = req.headers["authorization"];

    // ! ----> Si no hay token
    if (!auth_header) {
      //Creamos respuesta
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setMessage("Unauthorized")
        .setPayload({
          detail: "Authorization header is required",
        })
        .build();
      //? -------> Enviamos respuesta
      console.error("Authorization header is required");
      return res.status(401).json(response);
    }

    // * ----> Si hay token
    const accessToken = auth_header.split(" ")[1];

    //! ----> Si el token es invalido
    if (!accessToken) {
      //Creamos respuesta
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setMessage("Unauthorized")
        .setPayload({
          detail: "Invalid token",
        })
        .build();
      //? -------> Enviamos respuesta
      console.error("Invalid token");
      return res.status(401).json(response);
    }
    
    const decoded = jwt.verify(accessToken, ENVIROMENT.JWT_SECRET);
    
    // * ----> Si el token es valido
    req.user = decoded;
    return next(); //Pasamos al siguiente middleware
} 


// ! ----> Si hay un error
catch (error) {
    //Creamos respuesta
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    //? -------> Enviamos respuesta
    console.error(error.message);
    return res.status(500).json(response);
  }
};



export default vTokenMid;