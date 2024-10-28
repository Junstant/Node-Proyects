import User from "../models/user.model.js";
import { ErrorsDB } from "../constants/errors.js";

/**
 * Creates a new user in the database.
 * @param {string} name - The name of the user.
 * @param {number} age - The age of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} role - The role of the user.
 * @returns {Promise<void>}
 */
//? -------  guardado de un usuario en la base de datos con una funcion asincrona y manejo de errores personalizados
const createUser = async (name, age, email, password, role) => {
  try {
    const user = new User({
      name,
      age,
      email,
      password,
      role,
    });
    const result = await user.save();
    console.warn(`User ${result.name} created!`);
  } catch (error) {
    const errorCustom = ErrorsDB[error.code];
    if (errorCustom) errorCustom.action(errorCustom.message, errorCustom.code);
    else console.error(error);
  }
};

// createUser("Juan", 25, "juan@gmail", "123456", "admin");
//? -------  busqueda de un usuario por id en la base de datos con una funcion asincrona y manejo de errores personalizados
const searchById = async (id) => {
  try {
    const user = await User.findById(id);
    console.log(`The user is:` + user);
  } catch (error) {
    console.error(error);
  }
};

//actualizar usuario
const updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    console.log(`The user is:` + updatedUser);
  } catch (error) {
    console.error(error);
  }
};

//eliminar usuario
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(`The user is:` + deletedUser);
  } catch (error) {
    console.error(error);
  }
};

export { createUser, searchById, updateUser };
