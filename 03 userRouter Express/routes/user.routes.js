import express from "express";
import ResponseBuilder from "../utils/ResponseBuilder.utils.js";
import { getUserByName } from "../repositories/user.repositories.js";

// Import the user controller
const userRouter = express.Router();


//? id es un parametro de busqueda, esto va a al principio
userRouter.get('/:name', async (req, res) => {
  console.log(req.params)
  const name = req.params.name;
  const user = await getUserByName(name);

  res.send(user);
});


//Malas practicas por que no se esta utilizando el ResponseBuilder
userRouter.get("/", (req, res) => {
  res.json({
    ok: true,
    payload: {
      cantidad: 10,
      mensaje: "Datos",
      code: "GET_USERS_SUCCESS",
      satus: 200,
    },
  });
});
//Buenas practicas
userRouter.get("/cantidad", (req, res) => {
  const response = new ResponseBuilder();
    response
        .setOk(true)
        .setStatus(200)
        .setCode(ResponseBuilder.codes.GET_USERS_SUCCESS)
        .setPayload({mensaje: "10 usuarios"});
  res.json(response.build());
});

// ? Estructuras de respouesta API 
/* 
 * ok: boolean 
 status: status code HTTP
 * payload: object
 code: number || string

*/

export default userRouter;
