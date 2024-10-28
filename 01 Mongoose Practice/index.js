import fileSystem from "fs";
import { mongoose } from "./config/mongoDB.config.js";
import { createUser, searchById } from "./managers/users.manager.js";

// createUser("Pepesito123", 25, "juan@gmail", "123456", "admin");
// searchById("670966e4929559c35bdc9dff"); //? -------  busqueda de un usuario por id en la base de datos

//Las peticiones en vez de hacerlas asi
//! console.log(await searchById("670966e4929559c35bdc9dff")); //! Mala practica

//* Se deberian hacer asi
//* searchById("670966e4929559c35bdc9dff")
//*   .then((user) => { //Callback
//*   })
//*   .catch((error) => {
//*     console.error(error);
//*   }).finally(() => {
//*     console.log("Finally");
//*   });

