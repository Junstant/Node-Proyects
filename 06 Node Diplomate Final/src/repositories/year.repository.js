import Year from "../models/years.model.js";
import * as db from "../dataBase/models.js";
import CareerRepository from "./career.repository.js";

//Class to handle year related operations in the database
class YearRepository {
  //^ ---> Get year by number
  static async getYearByNumber(year) {
    const yearFinded = await Year.findOne({ year: year });

    //! ---> Si el año no existe, lanzar un error
    if (!yearFinded) {
      throw new Error("[Year.Repository.GetYearByNumber] - Year not found");
    }
    return yearFinded;
  }

  //^ ---> Create a new year
  static async createYear(year, careerId) {
    const yearFinded = await Year.findOne({ year: year });

    //! ---> Si el año ya existe, lanzar un error
    if (yearFinded) {
      throw new Error("[Year.Repository.Create] - Year already exists");
    }
    //* ---> Si no existe lo creo
    const newYear = new db.Year({year});

    // Agregar el año a la carrera
    const added = await CareerRepository.addYearToCareer(careerId, newYear._id);
    if (!added) {
      throw new Error("[Year.Repository.Create] - Error adding year to career");
    }

    return await newYear.save();
  }

  //^ ---> Remove year
  static async removeYear(year, careerId) {
    const yearToRemove = await db.Year.findOne({ year });
    
    //! ---> Si el año no existe, lanzar un error
    if (!yearToRemove) {
      throw new Error("[Year.Controller.Remove] - Year not found");
    }
    //! ---> Eliminar el año de la carrera
    const removed = await CareerRepository.removeYearFromCareer(careerId, yearToRemove._id);
    if (!removed) {
      throw new Error("[Year.Repository.Remove] - Error removing year from career");
    }
    //* ---> Si existe, eliminarlo
    await yearToRemove.deleteOne();
    return yearToRemove;
  }

  //^ ---> Get all years
  static async getAllYears(careerId) {
    const career = await CareerRepository.getCareerById(careerId);
    //! ---> Si la carrera no existe, lanzar un error
    if (!career) {
      throw new Error("[Year.Repository.GetAllYears] - Career not found");
    }
    const years = await db.Year.find({ _id: { $in: career.years } });
    return years;
  }


  // % --------------------------------- Module related operations --------------------------------- %
  
  //$$ ---> Add module to year
  static async addModuleToYear(yearNumber, moduleId) {
    const yearToUpdate = await Year.findOne({ year: yearNumber });
  
    //! ---> Si el año no existe, lanzar un error
    if (!yearToUpdate) {
      throw new Error("[Year.Repository.AddModuleToYear] - Year not found");
    }
    //* ---> Si existe, actualizarlo
    yearToUpdate.modules.push(moduleId);
    const updatedYear = await yearToUpdate.save();
  
    return updatedYear;
  }

  //$$ ---> Remove module from year
  static async removeModuleFromYear(yearNumber, moduleId) {
    const yearToUpdate = await Year.findOne({ year: yearNumber });

    //! ---> Si el año no existe, lanzar un error
    if (!yearToUpdate) {
      throw new Error("[Year.Repository.RemoveModuleFromYear] - Year not found");
    }
    //* ---> Si existe, actualizarlo
    yearToUpdate.modules.pull(moduleId);
    const updatedYear = await yearToUpdate.save();
    return updatedYear;
  }
}


export default YearRepository;
