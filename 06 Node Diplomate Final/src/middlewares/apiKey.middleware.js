import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import ENVIROMENT from "../config/enviroment.config.js";

const vApiKeyMid = async (req, res, next) => {
try{
    const api_key = req.headers["x-api-key"];

    // ! ----> Si no hay token
    if (!api_key) {
        //Creamos respuesta
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("Unauthorized")
            .setPayload({
            detail: "x-api-key header is required",
            })
            .build();
        //? -------> Enviamos respuesta
        console.error("[Api.Middleware] - x-api-key header is required");
        return res.status(401).json(response);
    }

    // ! ----> Si el token es invalido
    if(api_key !== ENVIROMENT.API_INTERNAL){
        //Creamos respuesta
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(401)
            .setMessage("Unauthorized")
            .setPayload({
            detail: "Invalid api key",
            })
            .build();
        //? -------> Enviamos respuesta
        console.error("[Api.Middleware] - Invalid x-api-key");
        return res.status(401).json(response);
    }

    next();
}
// ! ----> Si hay un error
catch(error){
 const response = new ResponseBuilder()
    .setOk(false)
    .setStatus(500)
    .setMessage("Internal Server Error")
    .setPayload({
        detail: error.message,
    })
    .build();
    console.error('[Api.Middleware] - ' + error.message);
    return res.status(500).json(response);
}
}

export default vApiKeyMid;