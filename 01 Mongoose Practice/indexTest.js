import fileSystem from "fs";
import { mongoose } from "./config/mongoDB.config.js";

//? -------------- creada de forma sincronica
// const createTxt = (fileName, text) => {
//   try {
//     if(!fileName) throw{message: "File name is required!", code: 400};
//     if(!text) throw{message: "Text is required!", code: 400};
//     if(typeof fileName !== "string") throw{message: "File name must be a string!", code: 400};

//     fileSystem.writeFileSync(`./files/${fileName}.txt`, text, "utf8");
//     console.warn("File created!");
//   } catch (error) {
//     console.error(error);
//     console.error("File not created!");
//   }
// };
// createTxt("example", "Hello World!");
// console.log("Hello World!");

//? -------------- creada de forma asincrona
const createTxt = async (fileName, text) => {
  try {
    if (!fileName) throw { message: "File name is required!", code: 400 };
    if (!text) throw { message: "Text is required!", code: 400 };
    if (typeof fileName !== "string") throw { message: "File name must be a string!", code: 400 };

    await fileSystem.promises.writeFile(`./files/${fileName}.txt`, text, "utf8");
    console.warn("File created!");
  } catch (error) {
    console.error(error);
    console.error("File not created!");
  }
};

//? -------------- ejecucion asincronica de forma sincronica (llamo a funciones asincronas de forma sincronica)
// const procesoX = async () => {
//     await console.log("Primero en ejecutarse");
//     await console.log("Segundo en ejecutarse");
//     await console.log("Tercero en ejecutarse");
// };

//? -------------- ejecucion con objeto de errores
const Errors = {
  INVALID_FILE_NAME: {
    message: "File name is required!",
    code: 400,
    name: "INVALID_FILE_NAME",
    action: (from, details) => {
      console.log(`Error: ${from} - ${details}`);
    },
  },
  INVALID_TEXT: {
    message: "Text is required!",
    code: 400,
    name: "INVALID_TEXT",
    action: (from, details) => {
      console.log(`Error: ${from} - ${details}`);
    },
  },
  INVALID_FILE_NAME_TYPE: {
    message: "File name must be a string!",
    code: 400,
    name: "INVALID_FILE_NAME_TYPE",
    action: (from, details) => {
      console.log(`Error: ${from} - ${details}`);
    },
  },
};

const createTxt2 = async (fileName, text) => {
  try {
    if (!fileName) throw Errors.INVALID_FILE_NAME;
    if (!text) throw Errors.INVALID_TEXT;
    if (typeof fileName !== "string") throw Errors.INVALID_FILE_NAME_TYPE;

    await fileSystem.promises.writeFile(`./files/${fileName}.txt`, text, "utf8");
    console.warn("File created!");
  } catch (error) {
    const errorCustom = Errors[error.name];
    if (errorCustom) errorCustom.action(errorCustom.message, errorCustom.code);
    else console.error(error);
    console.error("File not created!");
  }
};



