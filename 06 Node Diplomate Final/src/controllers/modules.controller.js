import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";

// ~ ------------------------------------> Create module <------------------------------------ ~
const createModule = async (req, res) => {
  //Extraer datos del body
  const { name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks } = req.body;

  try {
    // * ---------> Crear el módulo
    const Module = new Module({
      name,
      schedule,
      location,
      proffesor,
      dependencies,
      timeLeft,
      state,
      absents,
      period,
      nextBlock,
      notes,
      homeworks,
    });

    Module.save((error, module) => {

      //! -------> Si hay un error
      if(error){
        //Creamos respuesta
        const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(400)
          .setMessage("Bad Request")
          .setPayload({
            detail: error.message,
          })
          .build();

          //? -------> Enviamos respuesta
          console.error(error.message);
          return res.status(400).json(response);
      }

      //* -------> Si no hay error
      else{
        //Creamos respuesta
        const response = new ResponseBuilder()
          .setOk(true)
          .setStatus(201)
          .setMessage("Module created")
          .setPayload({
            module,
          })
          .build();

          //? -------> Enviamos respuesta
          console.warn("Module created");
          return res.status(201).json(response);
      }
  });
}
  //! ---> Si algo falla, mando esto
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
    console.error('[Modules.Controller.Create] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update module <------------------------------------ ~
const updateModule = async (req, res) => {};

// ~ ------------------------------------> Delete module <------------------------------------ ~
const deleteModule = async (req, res) => {};

export { createModule, updateModule, deleteModule };
