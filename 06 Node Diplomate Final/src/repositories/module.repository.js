import Module from "../models/modules.model.js";
import * as db from "../dataBase/models.js";
import absentModule from "./absent.repository.js";
import homeworkModule from "./homework.repository.js";
import noteModule from "./note.repository.js";
import scheduleModule from "./schedule.repository.js";

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
  const directFields = ["name", "location", "proffesor", "dependencies", "state", "period"];
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

  //^ ---> Add schedule to module
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
}

export default ModuleRepository;
