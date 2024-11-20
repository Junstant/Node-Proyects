import User from "../models/user.model.js";

//Class to handle user related operations in the database
class UserRepository {
  //^ ---> Get user by id
  static async getUserById(id) {
    const user = await User.findOne({ _id: id });

    //! ---> Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error("[User.Repository.GetUserById] - User not found");
    }
    return user;
  }

  //^ ---> Get user by email
  static async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  //^ ---> Save user to database
  static async saveUser(user) {
    return await user.save();
  }

  //^ ---> Set user to verified status
  static async setEmailVerified(bool, id) {
    const user = await UserRepository.getUserById(id);

    //! ---> Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error("[User.Repository.SetEmailVerified] - User not found");
    }
    //Actualizar el estado de verificación del correo
    user.emailVerified = bool;
    return await UserRepository.saveUser(user);
  }

  //^ ---> Create a new user
  static async createUser(name, email, password, verifyToken) {
    const user = new User({
      name,
      email,
      password,
      verifyToken,
      career: [],
    });

    //! ---> Si existe otro usuario con el mismo correo, lanzar un error
    const findedUser = await User.findOne({email: email});
    if (findedUser) {
      throw new Error("[User.Repository.Create] - User already exists");
    }
    return await UserRepository.saveUser(user);
  }

  // % --------------------------------- Module related operations --------------------------------- %


  // $$ ----> Add career to user
  static async addCareerToUser(userId, careerId) {
    const userToUpdate = await User.findOne({ _id: userId });

    //! ---> Si el usuario no existe, lanzar un error
    if (!userToUpdate) {
      throw new Error("[User.Repository.AddCareerToUser] - User not found");
    }

    userToUpdate.career.push(careerId);
    return await UserRepository.saveUser(userToUpdate);
  }

  // $$ ----> Remove career from user
  static async removeCareerFromUser(userId, careerId) {
    const userToUpdate = await User.findOne({ _id: userId });

    //! ---> Si el usuario no existe, lanzar un error
    if (!userToUpdate) {
      throw new Error("[User.Repository.RemoveCareerFromUser] - User not found");
    }

    userToUpdate.career = userToUpdate.career.filter((id) => id !== careerId);
    return await UserRepository.saveUser(userToUpdate);
  }
}

export default UserRepository;
