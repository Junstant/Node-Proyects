import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class homeworkModule {
  //^ --------------------> Create a new homework
  static async createHomework(moduleId, homeworks) {
    //Buscar el módulo para agregar la tarea
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleFinded) {
      throw new Error("[Homework.Repository.CreateHomework] - Module not found");
    }
    const savedHomeworks = [];
    
    for (const homework of homeworks) {
      const newHomework = new db.Homework({
        title: homework.title,
        deliveryDate: homework.deliveryDate,
        description: homework.description,
        completed: homework.completed,
        calification: homework.calification,
        remember: homework.remember,
      });

      //* ----> Agregar la tarea al módulo
      const added = await ModuleRepository.addHomeworkToModule(moduleId, newHomework._id);
      if (!added) {
        throw new Error("[Homework.Repository.CreateHomework] - Error adding homework to module");
      }

      //* ----> Guardar la tarea
      const savedHomework = await newHomework.save();
      savedHomeworks.push(savedHomework);
    }

    return savedHomeworks;
  }

  //^ --------------------> Find homework by id
  static async getHomeworkById(id) {
    //! ---> Si la tarea no existe, lanzar un error
    const homework = await db.Homework.findById(id);
    if (!homework) {
      throw new Error("[Homework.Repository.GetHomeworkById] - Homework not found");
    }
    return homework;
  }

  //^ --------------------> Get all homeworks
  static async getAllHomeworks(moduleId) {
    //Buscar el módulo
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleFinded) {
      throw new Error("[Homework.Repository.GetAllHomeworks] - Module not found");
    }
    //Obtener todas las tareas del módulo
    const homeworks = await db.Homework.find({ _id: { $in: moduleFinded.homeworks } });
    return homeworks;
  }

  //^ --------------------> Remove homework
  static async removeHomework(moduleId, id) {
    const homework = await db.Homework.findById(id);
    //! ---> Si la tarea no existe, lanzar un error
    if (!homework) {
      throw new Error("[Homework.Repository.RemoveHomework] - Homework not found");
    }
    //* ----> Buscar el módulo para eliminar la tarea
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Homework.Repository.RemoveHomework] - Module not found");
    }

    //* ----> Eliminar la tarea del módulo y de la base de datos
    const removed = ModuleRepository.removeHomeworkFromModule(moduleId, id);
    if (!removed) {
      throw new Error("[Homework.Repository.RemoveHomework] - Error removing homework from module");
    }
    
    await db.Homework.deleteOne({ _id: id });
    return homework;
  }

  //^ --------------------> Update homework
  static async updateHomework(id, homework) {
    const updatedHomework = await db.Homework.findById(id);
    //! ---> Si la tarea no existe, lanzar un error
    if (!updatedHomework) {
      throw new Error("[Homework.Repository.UpdateHomework] - Homework not found");
    }
    //Actualizar la tarea
    updatedHomework.title = homework.title;
    updatedHomework.deliveryDate = homework.deliveryDate;
    updatedHomework.description = homework.description;
    updatedHomework.completed = homework.completed;
    updatedHomework.calification = homework.calification;
    updatedHomework.remember = homework.remember;
    return await updatedHomework.save();
  }
}

export default homeworkModule;