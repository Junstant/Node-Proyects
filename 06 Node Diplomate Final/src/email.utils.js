import transporter from "./config/transporter.config.js";

/** 
 * @param {Object} options - Objeto con las opciones del correo
 * @returns {Promise} - Promesa que se resuelve si el correo se envía correctamente 
 * @description Envia un correo electronico
**/

// * ------> Enviar correo
const sendEmail = async (options) => {
    try{
      let response = await transporter.sendMail(options);
      console.log(`[Email.SendEmail] - Email sent to ${options.to}`);
    }
    catch(error){
      console.error(`[Email.SendEmail] - Error sending the email`, error);
      throw error;
    }
  }


export default sendEmail;