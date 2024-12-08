import * as db from "../dataBase/models.js";
import ModuleRepository from "./module.repository.js";

class scheduleModule {
  //^ --------------------> Create a new schedule
  static async createSchedule(schedule, moduleId) {
    const newSchedule = new db.Schedule({
      days: schedule.map((day) => ({
        name: day.name,
        fromHr: day.fromHr,
        toHr: day.toHr,
      })),
    });

    //Actualizar el módulo con el nuevo horario
    const sucess = ModuleRepository.addScheduleToModule(moduleId, newSchedule._id);
    if (!sucess) {
      throw new Error("[Schedule.Repository.CreateSchedule] - Error adding schedule to module");
    }

    await newSchedule.save();
    return newSchedule;
  }
  
  //^ --------------------> Find schedule by id
  static async getScheduleById(id) {
    const schedule = await db.Schedule.findById(id);
    if (!schedule) {
      throw new Error("[Schedule.Repository.GetScheduleById] - Schedule not found");
    }
  }

  //^ --------------------> Get all schedules
  static async getAllSchedules(moduleId) {
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    //! ---> Si el módulo no existe, lanzar un error
    if (!moduleFinded) {
      throw new Error("[Schedule.Repository.GetAllSchedules] - Module not found");
    }
    const schedules = await db.Schedule.find({ _id: { $in: moduleFinded.schedule } });
    return schedules;
  }

  //^ --------------------> Remove schedule
  static async removeSchedule(id, moduleId) {
    //! ---> Si el horario no existe, lanzar un error
    const schedule = await db.Schedule.findById(id);
    if (!schedule) {
      throw new Error("[Schedule.Repository.RemoveSchedule] - Schedule not found");
    }
    
    //! ---> Si el módulo no existe, lanzar un error
    const moduleFinded = await ModuleRepository.getModuleById(moduleId);
    if (!moduleFinded) {
      throw new Error("[Schedule.Repository.RemoveSchedule] - Module not found");
    }

    //Actualizar el módulo con el horario eliminado y luego eliminarlo
    const actualModule = ModuleRepository.removeScheduleFromModule(moduleId, id);
    if (!actualModule) {
      throw new Error("[Schedule.Repository.RemoveSchedule] - Error removing schedule from module");
    }
    
    await db.Schedule.deleteOne({_id: schedule._id});
    return schedule;
  }

  //^ --------------------> Update schedule
  static async updateSchedule(id, schedule) {
    const updatedSchedule = await db.Schedule.findById(id);
    if (!updatedSchedule) {
      throw new Error("[Schedule.Repository.UpdateSchedule] - Schedule not found");
    }
    updatedSchedule.days = schedule.map((day) => ({
      name: day.name,
      fromHr: day.fromHr,
      toHr: day.toHr,
    }));
    return await updatedSchedule.save();
}
};

export default scheduleModule;
