import User from "../models/user.model.js";

//Class to handle user related operations in the database
class UserRepository {
  //^ ---> Get user by id
  static async getUserById(id) {
    const user = await User.findOne({ _id: id });
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
        // emailVerified: false -----> Por defecto es false
    });
    return await UserRepository.saveUser(user);
  }
}

export default UserRepository;
