import * as db from "../dataBase/models.js";

const scheduleModule = {
  //^ --------------------> Create a new schedule
  async createSchedule(schedule) {
    const newSchedule = new db.Schedule({
      days: schedule.map((day) => ({
        name: day.name,
        fromHr: day.fromHr,
        toHr: day.toHr,
      })),
    });
    await newSchedule.save();
    return newSchedule;
  },
  
  //^ --------------------> Find schedule by id
  async getScheduleById(id) {
    const schedule = await db.Schedule.findById(id);
    if (!schedule) {
      throw new Error("[Schedule.Repository.GetScheduleById] - Schedule not found");
    }
  },

  //^ --------------------> Remove schedule
  async removeSchedule(id) {
    return await db.Schedule.findByIdAndDelete(id);
  },
};

export default scheduleModule;
