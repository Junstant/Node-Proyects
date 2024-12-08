import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class absentModule {
  //^ --------------------> Create a new absent
  static async createAbsent(moduleId ,absents) {
    const savedAbsents = [];

    //Buscar el módulo para agregar la ausencia
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Absent.Repository.CreateAbsent] - Module not found");
    }
    //Crear la ausencia
    for (const absent of absents) {
      const newAbsent = new db.Absent({
        date: absent.date,
        reason: absent.reason,
        absenceNumber: absent.absenceNumber,
      });
      //* ---> Agregar la ausencia al módulo
      const added = await ModuleRepository.addAbsentToModule(moduleId, newAbsent._id);
      if (!added) {
        throw new Error("[Absent.Repository.CreateAbsent] - Error adding absent to module");
      }

      //* ---> Guardar la ausencia
      const savedAbsent = await newAbsent.save(); 
      savedAbsents.push(savedAbsent);
    }
    
    return savedAbsents;
  }

  //^ --------------------> Find absent by id
  static async getAbsentById(id) {
    const absent = await db.Absent.findById(id);
    //! ---> Si la ausencia no existe, lanzar un error
    if (!absent) {
      throw new Error("[Absent.Repository.GetAbsentById] - Absent not found");
    }
    return absent;
  }

  //^ --------------------> Get all absents
  static async getAllAbsents(moduleId) {
    //Buscar el módulo
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Absent.Repository.GetAllAbsents] - Module not found");
    }
    //Obtener todas las ausencias del módulo
    const absents = await db.Absent.find({ _id: { $in: moduleFinded.absents } });
    return absents;
  }

  //^ --------------------> Remove absent
  static async removeAbsent(moduleId, id) {
    const absent = await db.Absent.findById(id);
    //! ---> Si la ausencia no existe, lanzar un error
    if (!absent) {
      throw new Error("[Absent.Repository.RemoveAbsent] - Absent not found");
    }

    //Buscar el módulo para eliminar la ausencia
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Absent.Repository.RemoveAbsent] - Module not found");
    }
    
    //Eliminar la ausencia del módulo y de la base de datos
    await db.Absent.deleteOne({ _id: id });
    ModuleRepository.removeAbsentFromModule(moduleId, id);

    return absent;
  }

  //^ --------------------> Update absent
  static async updateAbsent(id, absent) {
    const updatedAbsent = await db.Absent.findById(id);
    //! ---> Si la ausencia no existe, lanzar un error
    if (!updatedAbsent) {
      throw new Error("[Absent.Repository.UpdateAbsent] - Absent not found");
    }
    updatedAbsent.date = absent.date;
    updatedAbsent.reason = absent.reason;
    updatedAbsent.absenceNumber = absent.absenceNumber;
    return await updatedAbsent.save();
  }
}

export default absentModule;
