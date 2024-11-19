import Career from '../models/career.model.js';
import { Career as CareerModel } from '../dataBase/models.js';
import UserRepository from './user.repository.js';
import ResponseBuilder from '../utils/builders/responseBuilder.builder.js';

// Clase para manejar operaciones relacionadas con carreras en la base de datos
class CareerRepository {
  //^ ---> Obtener carrera por id
  static async getCareerById(id) {
    const careerFinded = await Career.findOne({ _id: id });

    //! ---> Si la carrera no existe, lanzar un error
    if (!careerFinded) {
      throw new Error("[Career.Repository.GetCareerById] - Career not found");
    }
    return careerFinded;
  }

  //^ ---> Obtener carrera por nombre
  static async getCareerByName(name) {
    const careerFinded = await Career.findOne({ name });

    //! ---> Si la carrera no existe, lanzar un error
    if (!careerFinded) {
      throw new Error("[Career.Repository.GetCareerByName] - Career not found");
    }
    return careerFinded;
  }

  //^ ---> Crear una nueva carrera
  static async createCareer(userId, name) {
    const careerFinded = await Career.findOne({ name });

    //! ---> Si la carrera ya existe, lanzar un error
    if (careerFinded) {
      throw new Error("[Career.Repository.Create] - Career already exists");
    }
    //* ---> Si no existe, crearla y guardarla
    const newCareer = new CareerModel({ userId, name });

    // Agregar la carrera al usuario
    const added = await UserRepository.addCareerToUser(userId, newCareer._id);
    if (!added) {
      throw new Error("[Career.Repository.Create] - Error adding career to user");
    }

    return await newCareer.save();
  }

  //^ ---> Remove career
  static async removeCareer(userId, name) {
    const careerToRemove = await CareerModel.findOne({ name });

    //! ---> Si la carrera no existe, lanzar un error
    if (!careerToRemove) {
      throw new Error("[Career.Controller.Remove] - Career not found");
    }
    //* ---> Si existe, eliminarla
    await careerToRemove.deleteOne();

    // Eliminar la carrera del usuario
    const removed = await UserRepository.removeCareerFromUser(userId, careerToRemove._id);
    if (!removed) {
      throw new Error("[Career.Repository.Remove] - Error removing career from user");
    }

    return careerToRemove;
  }

  //^ ---> Update career
  static async updateCareer(name, newName) {
    const careerToUpdate = await CareerModel.findOne({ name });

    //! ---> Si la carrera no existe, lanzar un error
    if (!careerToUpdate) {
      throw new Error("[Career.Repository.Update] - Career not found");
    }
    //* ---> Si existe, actualizarla
    careerToUpdate.name = newName;
    const updatedCareer = await careerToUpdate.save();

    return updatedCareer;
  }

  //^ ---> Get all careers
  static async getAllCareers() {
    const careers = await CareerModel.find();
    if (!careers) {
      throw new Error("[Career.Repository.GetAllCareers] - Careers not found");
    }
    return careers;
  }

  // % --------------------------------- Module related operations --------------------------------- %

  //$$ ---> Add year to career
  static async addYearToCareer(careerId, yearId) {
    const careerToUpdate = await Career.findOne({ _id: careerId });

    //! ---> Si la carrera no existe, lanzar un error
    if (!careerToUpdate) {
      throw new Error("[Career.Repository.AddYearToCareer] - Career not found");
    }

    //* ---> Si existe, actualizarlo
    careerToUpdate.years.push(yearId);
    const updatedCareer = await careerToUpdate.save();

    return updatedCareer;
  }

  //$$ ---> Remove year from career
  static async removeYearFromCareer(careerId, yearId) {
    const careerToUpdate = await Career.findOne({ _id: careerId });
    //! ---> Si la carrera no existe, lanzar un error
    if (!careerToUpdate) {
      throw new Error("[Career.Repository.RemoveYearFromCareer] - Career not found");
    }
    //* ---> Si existe, actualizarlo
    careerToUpdate.years = careerToUpdate.years.filter((year) => year != yearId);
    const updatedCareer = await careerToUpdate.save();

    return updatedCareer;
}
}

export default CareerRepository;