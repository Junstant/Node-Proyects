import dotenv from "dotenv";

//Internamente leerá el archivo .env y lo pondrá en process.env
dotenv.config();

//Objeto que contiene las variables de entorno
const ENVIROMENT = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_INTERNAL: process.env.API_INTERNAL
};

export default ENVIROMENT;