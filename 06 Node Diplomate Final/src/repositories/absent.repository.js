import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class absentModule {
  //^ --------------------> Create a new absent
  static async createAbsent(moduleId ,absent) {
    console.log(absent.date, absent.reason, absent.absenceNumber);
    const newAbsent = new db.Absent({
      date: absent.date,
      reason: absent.reason,
      absenceNumber: absent.absenceNumber,
    });

    await newAbsent.save();

    //Buscar el módulo para agregar la ausencia
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Absent.Repository.CreateAbsent] - Module not found");
    }

    //Agregar la ausencia al módulo
    ModuleRepository.addAbsentToModule(moduleId, newAbsent._id);
    return newAbsent;
  }

  //^ --------------------> Find absent by id
  static async getAbsentById(id) {
    const absent = await db.Absent.findById(id);
    if (!absent) {
      throw new Error("[Absent.Repository.GetAbsentById] - Absent not found");
    }
    return absent;
  }

  //^ --------------------> Get all absents
  static async getAllAbsents() {
    const absents = await db.Absent.find();
    if (!absents) {
      throw new Error("[Absent.Repository.GetAllAbsents] - Absents not found");
    }
    return absents;
  }

  //^ --------------------> Remove absent
  static async removeAbsent(moduleId, id) {
    const absent = await db.Absent.findById(id);
    if (!absent) {
      throw new Error("[Absent.Repository.RemoveAbsent] - Absent not found");
    }
    await db.Absent.deleteOne({ _id: id });

    //Buscar el módulo para eliminar la ausencia
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Absent.Repository.RemoveAbsent] - Module not found");
    }

    //Eliminar la ausencia del módulo
    ModuleRepository.removeAbsentFromModule(moduleId, id);

    return absent;
  }

  //^ --------------------> Update absent
  async updateAbsent(id, absent) {
    const updatedAbsent = await db.Absent.findById(id);
    if (!updatedAbsent) {
      throw new Error("[Absent.Repository.UpdateAbsent] - Absent not found");
    }
    updatedAbsent.date = absent.date;
    updatedAbsent.justification = absent.justification;
    return await updatedAbsent.save();
  }
}

export default absentModule;
