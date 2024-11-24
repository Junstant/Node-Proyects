import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
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
      console.error("[Auth.Middleware] - Authorization header is required");
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
          detail: "[Auth.Middleware] - Invalid token",
        })
        .build();
      //? -------> Enviamos respuesta
      console.error("Invalid token");
      return res.status(401).json(response);
    }

    // * ----> Desencriptamos el token
    const decoded = jwt.verify(accessToken, ENVIROMENT.JWT_SECRET);

    //! ----> Si el token esta vencido
    if(decoded.exp < Date.now() / 1000){
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(401)
      .setMessage("Unauthorized")
      .setPayload({
        detail: "Token expired",
      })
      .build();
      console.warn("[Auth.Controller.VerifyToken] - Token expired in request User token verification");
      return res.status(401).json(response);
    }
    
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
    console.error('[Auth.Middleware] - ' + error.message);
    return res.status(500).json(response);
  }
};



export default vTokenMid;