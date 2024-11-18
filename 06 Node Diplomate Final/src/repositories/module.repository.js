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

  //^ --------------------> Create a new module
  static async createModule() {
    // Crear un nuevo módulo
    const newModule = new db.Module({});
    // Guardar el módulo en la base de datos
    await newModule.save();
    return newModule;
  }

  //^ --------------------> Update module
  static async updateModule(id, data) {
    // Crear un objeto vacío para almacenar solo los campos definidos
    const updateData = {};

    // Asignar directamente campos que no son arrays o no requieren push
    const directFields = ["name", "location", "professor", "dependencies", "state", "period"];
    for (const field of directFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    // Realizar la actualización usando findByIdAndUpdate con operadores $set y $push
    const updatedModule = await Module.findByIdAndUpdate(id, updateData, { new: true });
    return updatedModule;
  }

  //^ ---> Delete module
  static async deleteModule(id) {
    const moduleDeleted = await Module.findByIdAndDelete(id);
    return moduleDeleted;
  }

  // % --------------------------------- Module related operations --------------------------------- %

  //$$ ---> Add schedule to module
  static async addScheduleToModule(moduleId, scheduleId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.AddScheduleToModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.schedule.push(scheduleId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Remove schedule from module
  static async removeScheduleFromModule(moduleId, scheduleId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.RemoveScheduleFromModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.schedule = moduleToUpdate.schedule.filter((schedule) => schedule != scheduleId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Add absent to module
  static async addAbsentToModule(moduleId, absentId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.AddAbsentToModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.absents.push(absentId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Remove absent from module
  static async removeAbsentFromModule(moduleId, absentId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.RemoveAbsentFromModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.absents = moduleToUpdate.absents.filter((absent) => absent != absentId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Add a note to module
  static async addNoteToModule(moduleId, noteId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.AddNoteToModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.notes.push(noteId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Remove note from module
  static async removeNoteFromModule(moduleId, noteId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.RemoveNoteFromModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.notes = moduleToUpdate.notes.filter((note) => note != noteId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }
}

export default ModuleRepository;
