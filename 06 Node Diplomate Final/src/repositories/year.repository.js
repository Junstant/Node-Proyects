import Year from "../models/years.model.js";
import * as db from "../dataBase/models.js";

//Class to handle year related operations in the database
class YearRepository {
  //^ ---> Get year by number
  static async getYearByNumber(year) {
    const yearFinded = await Year.findOne({ year });

    //! ---> Si el año no existe, lanzar un error
    if (!yearFinded) {
      throw new Error("[Year.Repository.GetYearByNumber] - Year not found");
    }
    return yearFinded;
  }

  //^ ---> Save year to database
  static async saveYear(newYear) {
    return await newYear.save();
  }

  //^ ---> Create a new year
  static async createYear(year) {

    //! ---> Si el año ya existe, lanzar un error
    if (this.getYearByNumber(year)) {
      throw new Error("[Year.Repository.Create] - Year already exists");
    }

    //* ---> Si no existe, crearlo y guardarlo
    const newYear = new db.Year({
      year,
    });
    return await newYear.save();
  }

  //^ ---> Update year
  static async updateYear(yearNumber, moduleId) {

    const yearToUpdate = await db.Year.findOne({ year: yearNumber });
    
    //! ---> Si el año no existe, lanzar un error
    if (!yearToUpdate) {
      throw new Error("[Year.Controller.Update] - Year not found");
    }

    //* ---> Si existe, actualizarlo
    yearToUpdate.modules.push(moduleId);
    const updatedYear = await yearToUpdate.save();
    
    return updatedYear;
  }

  //^ ---> Remove year
  static async removeYear(year) {
    const yearToRemove = await db.Year.findOne({ year });
    
    //! ---> Si el año no existe, lanzar un error
    if (!yearToRemove) {
      throw new Error("[Year.Controller.Remove] - Year not found");
    }

    //* ---> Si existe, eliminarlo
    await yearToRemove.deleteOne();

    return yearToRemove;
  }

  //^ ---> Get all years
  static async getAllYears() {
    const years = await db.Year.find();
    if (!years) {
      throw new Error("[Year.Repository.GetAllYears] - Years not found");
    }
    return years;
  }
}

export default YearRepository;
