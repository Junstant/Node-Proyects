import User from "../models/user.model.js";

//Class to handle user related operations in the database
class UserRepository {
  //^ ------------------> Get user by id
  static async getUserById(id) {
    const user = await User.findOne({ _id: id });

    //! ---> Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error("[User.Repository.GetUserById] - User not found");
    }
    return user;
  }

  //^ ------------------>Get user by email
  static async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  //^ ------------------> Save user to database
  static async saveUser(user) {
    return await user.save();
  }

  //^ ------------------> Set user to verified status
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

  //^ ------------------> Create a new user
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

  //^ ------------------> Update user password and name
  static async updateUser(email, name, password) {
    const user = await User.findOne({ email: email });

    //! ---> Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error("[User.Repository.UpdateUser] - User not found");
    }

    user.name = name;
    user.password = password;
    return await UserRepository.saveUser(user);
  }

  //^ ------------------> Delete user
  static async deleteUser(email) {
    const user = await User.findOne({ email: email });

    //! ---> Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error("[User.Repository.DeleteUser] - User not found");
    }

    return await User.deleteOne({ email: email });
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

    const index = userToUpdate.career.indexOf(careerId);
    if (index === -1) {
      throw new Error("[User.Repository.RemoveCareerFromUser] - Career not found");
    }

    userToUpdate.career.splice(index, 1);
    return await UserRepository.saveUser(userToUpdate);
  }
}

export default UserRepository;
