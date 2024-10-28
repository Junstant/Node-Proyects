//Son los archivos que se encargar de intereactuar con los datos
//ej getelementbyid

import { readJsonFile } from "../utils/jsonManager.utils.js";

const getUserByName = async (name) => {
    try {
        const usersDb = await readJsonFile('users');
        const userFinded = usersDb.find(user => user.name === name);
        return userFinded;
    }
    catch (error) {
        console.log(error)
    }
}

export { getUserByName }   