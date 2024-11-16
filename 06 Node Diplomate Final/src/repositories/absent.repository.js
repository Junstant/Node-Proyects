import * as db from "../dataBase/models.js";

class absentModule {
  //^ --------------------> Create a new absent
  static async createAbsent(absent) {
    const newAbsent = new db.Absent({
      date: absent.date,
      justification: absent.justification,
    });
    await newAbsent.save();
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
  static async removeAbsent(id) {
    const absent = await db.Absent.findById(id);
    if (!absent) {
      throw new Error("[Absent.Repository.RemoveAbsent] - Absent not found");
    }
    await db.Absent.deleteOne({ absent });
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
