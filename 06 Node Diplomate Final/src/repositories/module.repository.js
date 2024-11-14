import Module from "../models/modules.model.js";
import * as db from "../dataBase/models.js";

//Class to handle module related operations in the database
class ModuleRepository {
  //^ ---> Get module by id
  static async getModuleById(id) {
    const moduleFinded = await Module.findOne({ _id: id });

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleFinded) {
        throw new Error("[Module.Repository.GetModuleById] - Module not found");
        }
    return moduleFinded;
  }

  //^ ---> Get module by name
  static async getModuleByName(name) {
    const moduleFinded = await Module.findOne({ name });

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleFinded) {
        throw new Error("[Module.Repository.GetModuleByName] - Module not found");
        }
    return moduleFinded;
  }

  //^ ---> Save module to database
  static async saveModule(newModule) {
    return await newModule.save();
  }

  //% --------------------> Create a new module
  static async createModule(name, schedule, location, proffesor, dependencies, state, period, notes, homeworks, index) {
    //^ ---> Create schedule
    const newSchedule = new db.Schedule({
      days: schedule.map((day) => ({
        name: day.name,
        fromHr: day.fromHr,
        toHr: day.toHr,
      })),
    });
    // Guardar el Schedule
    await newSchedule.save();

    //^ ---> Create notes
    const newNotes = Array.isArray(notes)
      ? notes.map((note) => {
          return new db.Note({
            title: note.title,
            calification: note.calification,
          });
        })
      : []; // Si no es un arreglo, usamos un arreglo vacío
    // Guardar las notas
    await db.Note.insertMany(newNotes);

    //^ ---> Create absents
    const newAbsents = Array.isArray(absents)
      ? absents.map((absent) => {
          return new db.Absent({
            date: new Date(absent.date), // Asegúrate de convertir la fecha
            reason: absent.reason,
            absenceNumber: absent.absenceNumber,
          });
        })
      : []; // Si no es un arreglo, usamos un arreglo vacío
    // Guardar las faltas
    await db.Absent.insertMany(newAbsents);

    //^ ---> Create homeworks
    const newHomeworks = Array.isArray(homeworks)
      ? homeworks.map((homework) => {
          return new db.Homework({
            title: homework.title,
            description: homework.description,
            deliveryDate: new Date(homework.deliveryDate), // Convertimos la fecha
            completed: homework.completed,
            calification: homework.calification, // Aseguramos que sea un número
            remember: homework.remember.map((reminder) => ({
              description: reminder.description,
              completed: reminder.completed,
            })), // Adaptamos el formato del campo remember
          });
        })
      : []; // Si no es un arreglo, usamos un arreglo vacío
    // Intentar guardar las tareas en la base de datos
    await db.Homework.insertMany(newHomeworks);

    //^ ---> Create module
    const newModule = new db.Module({
      name,
      schedule: newSchedule._id,
      location,
      proffesor,
      dependencies,
      state,
      absents: newAbsents.map((absent) => absent._id),
      period,
      notes: newNotes.map((note) => note._id),
      homeworks: newHomeworks.map((homework) => homework._id),
      index,
    });

    //^ ---> Save module
    await newModule.save();
    return newModule;
  }

  //% --------------------> Update module
  static async updateModule(id, name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks, index, Year) {
    //^ ---> Create schedule
    const newSchedule = new db.Schedule({
      days: schedule.map((day) => ({
        name: day.name,
        fromHr: day.fromHr,
        toHr: day.toHr,
      })),
    });
    // Guardar el Schedule
    await newSchedule.save();

    //^ ---> Create notes
    const newNotes = notes.map((note) => {
      return new db.Note({
        title: note.title,
        calification: note.calification,
      });
    });
    // Guardar las notas
    await db.Note.insertMany(newNotes);

    //^ ---> Create absents
    const newAbsents = absents.map((absent) => {
      return new db.Absent({
        date: new Date(absent.date), // Asegúrate de convertir la fecha
        reason: absent.reason,
        absenceNumber: absent.absenceNumber,
      });
    });
    // Guardar las faltas
    await db.Absent.insertMany(newAbsents);

    //^ ---> Create homeworks
    const newHomeworks = homeworks.map((homework) => {
      return new db.Homework({
        title: homework.title,
        description: homework.description,
        deliveryDate: new Date(homework.deliveryDate), // Convertimos la fecha
        completed: homework.completed,
        calification: homework.calification, // Aseguramos que sea un número
        remember: homework.remember.map((reminder) => ({
          description: reminder.description,
          completed: reminder.completed,
        })), // Adaptamos el formato del campo remember
      });
    });
    // Intentar guardar las tareas en la base de datos
    await db.Homework.insertMany(newHomeworks);

    //^ ---> Update module
    const updatedModule = await Module.findByIdAndUpdate(id, {
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
      Year,
    });
    return updatedModule;
  }

  //^ ---> Delete module
  static async deleteModule(id) {
    const moduleDeleted = await Module.findByIdAndDelete(id);
    return moduleDeleted;
  }
}

export default ModuleRepository;
