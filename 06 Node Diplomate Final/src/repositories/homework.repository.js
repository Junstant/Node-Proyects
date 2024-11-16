import * as db from "../dataBase/models.js";

class homeworkModule {
  //^ --------------------> Create a new homework
  static async createHomework(homework) {
    const newHomework = new db.Homework({
      title: homework.title,
      description: homework.description,
      deadline: homework.deadline,
    });
    await newHomework.save();
    return newHomework;
  }

  //^ --------------------> Find homework by id
  static async getHomeworkById(id) {
    const homework = await db.Homework.findById(id);
    if (!homework) {
      throw new Error("[Homework.Repository.GetHomeworkById] - Homework not found");
    }
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
  static async removeHomework(id) {
    const homework = await db.Homework.findById(id);
    if (!homework) {
      throw new Error("[Homework.Repository.RemoveHomework] - Homework not found");
    }
    await db.Homework.deleteOne({ homework });
  }

  //^ --------------------> Update homework
  async updateHomework(id, homework) {
    const updatedHomework = await db.Homework.findById(id);
    if (!updatedHomework) {
      throw new Error("[Homework.Repository.UpdateHomework] - Homework not found");
    }
    updatedHomework.title = homework.title;
    updatedHomework.description = homework.description;
    updatedHomework.deadline = homework.deadline;
    return await updatedHomework.save();
  }
}

export default homeworkModule;
