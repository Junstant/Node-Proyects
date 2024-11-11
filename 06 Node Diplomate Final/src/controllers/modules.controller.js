import ResponseBuilder from "../utils/builders/responseBuilder.builder.js";
import * as db from '../dataBase/models.js';
import modulesValidations from "../utils/modulesValidation.util.js";

// ~ ------------------------------------> Create module <------------------------------------ ~
const createModule = async (req, res) => {
  // Extraer datos del body
  const { name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks, index, Year } = req.body;

  try {
    // ^ --------------> Enviar los datos a la función de validación
    const Validations = modulesValidations(name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks);

    // ^ --------------> Validar si hay errores
    if(Validations.setOk === false){
      console.error('[Modules.Controller.Create] - Validation error');
      return res.status(400).json(Validations.response);
    }

    //% ---------------------> Creamos el Schedule
    const newSchedule = new db.Schedule({
      days: schedule.map((day) => ({
        name: day.name,
        fromHr: day.fromHr,
        toHr: day.toHr,
      })),
    });
    // Guardar el Schedule
    await newSchedule.save();

    //% ---------------------> Creamos las notas
 
    const newNotes = notes.map((note) => {
      return new db.Note({
        title: note.title,
        calification: note.calification,
      });
    });
    // Guardar las notas
    await db.Note.insertMany(newNotes);

    //% ---------------------> Creamos los absents
    const newAbsents = absents.map((absent) => {
      return new db.Absent({
        date: new Date(absent.date), // Asegúrate de convertir la fecha
        reason: absent.reason,        
        absenceNumber: absent.absenceNumber,
      });
    });
    // Guardar las faltas
    await db.Absent.insertMany(newAbsents);


    //% ---------------------> Creamos las tareas
    const newHomeworks = homeworks.map((homework) => {
      return new db.Homework({
        title: homework.title,
        description: homework.description,
        deliveryDate: new Date(homework.deliveryDate), // Convertimos la fecha
        completed: homework.completed,
        calification: homework.calification, // Aseguramos que sea un número
        remember: homework.remember.map((reminder) => ({
          description: reminder.description,
          completed: reminder.completed
        })) // Adaptamos el formato del campo remember
      });
    });

    // Intentar guardar las tareas en la base de datos
    await db.Homework.insertMany(newHomeworks);

    //% ---------------------> Creamos el módulo
    const newModule = new db.Module({
      name,
      schedule: newSchedule._id, 
      location,
      proffesor,
      dependencies,
      timeLeft,
      state,
      absents: newAbsents.map((absent) => absent._id),
      period,
      nextBlock,
      notes: newNotes.map((note) => note._id),
      homeworks: newHomeworks.map((homework) => homework._id),
      index,
    });

    // Guardar el módulo
    const savedModule = await newModule.save();

    // Crear respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Module created successfully")
      .setPayload({
        module: savedModule,
      })
      .build();

    // Enviar respuesta
    console.warn('[Modules.Controller.Create] - Module created successfully');
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
    console.error('[Modules.Controller.Create] - ' + error.message);
    return res.status(500).json(response);
  }
};

// ~ ------------------------------------> Update module <------------------------------------ ~
const updateModule = async (req, res) => {};

// ~ ------------------------------------> Delete module <------------------------------------ ~
const deleteModule = async (req, res) => {};

export { createModule, updateModule, deleteModule };
