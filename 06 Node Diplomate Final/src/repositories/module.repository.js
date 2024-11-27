import Module from "../models/modules.model.js";
import * as db from "../dataBase/models.js";
import YearRepository from "./year.repository.js";

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

  //^ --------------------> Create a new module
  static async createModule(yearId) {
    const newModule = new db.Module({});

    //! ---> Si el año no existe, lanzar un error
    const moduleAdded = await YearRepository.addModuleToYear(yearId, newModule._id);
    if (!moduleAdded) {
      throw new Error("[Module.Repository.CreateModule] - Error adding module to year");
    }
    return await newModule.save();
  }

  //^ --------------------> Update module
  static async updateModule(id, data) {
    // Crear un objeto vacío para almacenar solo los campos definidos
    const updateData = {};

    // Asignar directamente campos que no son arrays o no requieren push
    const directFields = ["name", "location", "professor", "dependencies", "state", "period", "color"];
    for (const field of directFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }
    const moduleToUpdate = await Module.findById(id);
    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.UpdateModule] - Module not found");
    }
    moduleToUpdate.set(updateData);
    return await moduleToUpdate.save();
  }

  //^ ---> Delete module
  static async deleteModule(yearId, id) {
    //! ---> Si el año no existe, lanzar un error
    const yearFinded = await YearRepository.getYearById(yearId);
    if (!yearFinded) {
      throw new Error("[Module.Repository.DeleteModule] - Year not found");
    }

    //* ---> Eliminar el módulo del año
    const yearRemoved = await YearRepository.removeModuleFromYear(yearId, id);
    if (!yearRemoved) {
      throw new Error("[Module.Repository.DeleteModule] - Error removing module from year");
    }
    //! ---> Si el módulo no existe, lanzar un error
    const moduleDeleted = await Module.findByIdAndDelete(id);
    if (!moduleDeleted) {
      throw new Error("[Module.Repository.DeleteModule] - Module not found");
    }
    return moduleDeleted;
  }

  //^ ---> Get all modules
  static async getAllModules(yearId) {
    const year = await YearRepository.getYearById(yearId);
    //! ---> Si el año no existe, lanzar un error
    if (!year) {
      throw new Error("[Module.Repository.GetAllModules] - Year not found");
    }
    return await Module.find({ _id: { $in: year.modules } });
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

  //$$ ---> Add homework to module
  static async addHomeworkToModule(moduleId, homeworkId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.AddHomeworkToModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.homeworks.push(homeworkId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }

  //$$ ---> Remove homework from module
  static async removeHomeworkFromModule(moduleId, homeworkId) {
    const moduleToUpdate = await Module.findById(moduleId);

    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleToUpdate) {
      throw new Error("[Module.Repository.RemoveHomeworkFromModule] - Module not found");
    }

    //* ---> Si existe, actualizarlo
    moduleToUpdate.homeworks = moduleToUpdate.homeworks.filter((homework) => homework != homeworkId);
    const updatedModule = await moduleToUpdate.save();

    return updatedModule;
  }
}

export default ModuleRepository;
