import fileSystem from 'fs';

const createJsonFile = async (fileName, data) => {
    //Podemos hacer manejo de errores y validaciones
    const file = `./public/${fileName}.json`;
    await fileSystem.promises.writeFile(file, JSON.stringify(data), {encoding: 'utf8'});
};

const readJsonFile = async (fileName) => {
    const file = `./public/${fileName}.json`;
    const json = await fileSystem.promises.readFile(file, {encoding: 'utf8'});
    return JSON.parse(json);
}

export {createJsonFile, readJsonFile};