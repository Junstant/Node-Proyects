import ResponseBuilder from "../utils/builders/responseBuilder.utils.js";

// ? ----> Middleware para verificar el rol del usuario
const vRoleMid = (role) => {
    return async (req, res, next) => {
        try {
            // ! ----> Si el rol del usuario no es el correcto
            if (req.user.role !== role) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(401)
                    .setMessage("Unauthorized")
                    .setPayload({
                        detail: "You don't have the necessary permissions",
                    })
                    .build();
                //? -------> Enviamos respuesta
                console.error("You don't have the necessary permissions");
                return res.status(401).json(response);
            }
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
            console.error(error.message);
            return res.status(500).json(response);
        }
    };
};

export default vRoleMid;