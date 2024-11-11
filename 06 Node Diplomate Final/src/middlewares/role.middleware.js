import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";

// ? ----> Middleware para verificar el rol del usuario
const vRoleMid = (role) => {
  return async (req, res, next) => {
    try {
      // ! ----> Si el rol del usuario no esta incluido en el array de roles
      if (role.includes(req.user.role) === false) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(401)
          .setMessage("Unauthorized")
          .setPayload({
            detail: "You don't have the necessary permissions",
          })
          .build();
        //? -------> Enviamos respuesta
        console.error("[Role.Middleware] - You don't have the necessary permissions" );
        return res.status(401).json(response);
      }

      // ! ----> Si no hay rol en el parametro o el usuario tiene el rol correcto
      if (!role || !req.user.role) {
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(401)
          .setMessage("Unauthorized")
          .setPayload({
            detail: "Role is required",
          })
          .build();
        //? -------> Enviamos respuesta
        console.error("[Role.Middleware] - Role is required");
        return res.status(401).json(response);
      }


      // * ----> Si el rol es correcto
      next();
    } 
    
    // ! ----> Si hay un error
    catch (error) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage("Internal Server Error")
        .setPayload({
          detail: error.message,
        })
        .build();
      //? -------> Enviamos respuesta
      console.error('[Role.Middleware] - ' + error.message);
      return res.status(500).json(response);
    }
  };
};

export default vRoleMid;
