import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class homeworkModule {
  //^ --------------------> Create a new homework
  static async createHomework(moduleId, homeworks) {
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

      const savedHomework = await newHomework.save();
      savedHomeworks.push(savedHomework);
    }

    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Homework.Repository.CreateHomework] - Module not found");
    }

    for (const savedHomework of savedHomeworks) {
      ModuleRepository.addHomeworkToModule(moduleId, savedHomework._id);
    }

    return savedHomeworks;
  }

  //^ --------------------> Find homework by id
  static async getHomeworkById(id) {
    const homework = await db.Homework.findById(id);
    if (!homework) {
      throw new Error("[Homework.Repository.GetHomeworkById] - Homework not found");
    }

    return homework;
  }

  //^ --------------------> Get all homeworks
  static async getAllHomeworks() {
    const homeworks = await db.Homework.find();
    if (!homeworks) {
      throw new Error("[Homework.Repository.GetAllHomeworks] - Homeworks not found");
    }

    return homeworks;
  }

  //^ --------------------> Remove homework
  static async removeHomework(moduleId, id) {
    const homework = await db.Homework.findById(id);
    if (!homework) {
      throw new Error("[Homework.Repository.RemoveHomework] - Homework not found");
    }

    await db.Homework.deleteOne({ _id: id });

    //Buscar el módulo para eliminar la tarea
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Homework.Repository.RemoveHomework] - Module not found");
    }

    //Eliminar la tarea del módulo
    ModuleRepository.removeHomeworkFromModule(moduleId, id);

    return homework;
  }

  //^ --------------------> Update homework
  static async updateHomework(id, homework) {
    const updatedHomework = await db.Homework.findById(id);
    if (!updatedHomework) {
      throw new Error("[Homework.Repository.UpdateHomework] - Homework not found");
    }

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