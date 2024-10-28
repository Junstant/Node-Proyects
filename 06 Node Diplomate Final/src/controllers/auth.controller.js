import ENVIROMENT from "../config/enviroment.config.js";
import User from "../models/user.model.js";
import ResponseBuilder from "../utils/builders/responseBuilder.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../email.utils.js";



// TODO  ---------------------------------------> Registro de usuario <---------------------------------------
const registerUserController = async (req, res) => {
//* ---> Intento de ejecutar el codigo    
  try {
    //Extraemos los datos del body
    const { name, email, password } = req.body;

    //! --------> Si algun campo esta vacio
    if (!name || !email || !password) {
      //Creamos respuesta
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Bad Request")
        .setPayload({
          detail: "Missing required fields",
        })
        .build();

      //? -------> Enviamos respuesta
      console.warn("Missing required fields in request User registration"); 
      return res.status(400).json(response);
    }

    // --------> Validamos que el email no este registrado
    const userFindedEmail = await User.findOne({email: email});

    //! --------> Si el email ya esta registrado
    if(userFindedEmail){
      //Creamos respuesta
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Bad Request")
        .setPayload({
          detail: "Email already registered",
        })
        .build();

      //? -------> Enviamos respuesta
      console.warn("Email already registered");
      return res.status(400).json(response);
    }

    // * --------> Si todo esta correcto, creamos el usuario
    //Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creamos el token de verificacion
    const verificationToken = jwt.sign({email: email}, ENVIROMENT.JWT_SECRET, {expiresIn: "1d"});
    
    //Creamos la url de verificacion
    const url_verification = `http://localhost:${ENVIROMENT.PORT}/api/auth/verify/${verificationToken}`;

    //Enviamos el correo de verificacion
    await sendEmail({
        from: ENVIROMENT.GMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: 
        `<h1>Verify your email</h1>
        <p>Click the following link to verify your email</p>
        <a href="${url_verification}">Verify</a>`
    });

    //Creamos el usuario
    const user = new User({
        name,
        email,
        password: hashedPassword,
        verifyToken: verificationToken,
        // emailVerified: false -----> Por defecto es false
    });

    //* --> Guardamos el usuario
    await user.save();

    //Creamos respuesta
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(201)
      .setMessage("Created")
      .setPayload({
        message: `User ${user.name} created`,
        user: user,
      })
      .build();

    //? -------> Enviamos respuesta
    console.warn(`User ${user.name} created`);
    return res.status(201).json(response);
  } 


//! ---> Si algo falla, mando esto
  catch (error) {
    //Creamos respuesta
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    //? -------> Enviamos respuesta
    console.error(error.message);
    return res.status(500).json(response);
  }
};


// ? ---------------> Verificacion de correo
const verifyMailController = async (req, res) => {
  try{
    const {token} = req.params;
    // ! --------> Si no hay token
    if(!token){
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setMessage("Bad Request")
      .setPayload({
        detail: "Missing required fields",
      })
      .build();
      console.warn("Missing token in request User registration");
      return res.status(400).json(response);
     }

      // * --------> Si hay token, verificamos la firma
     const decoded = await jwt.verify(token, ENVIROMENT.JWT_SECRET);

      // ! --------> Si la firma no es valida
     if(!decoded){
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setMessage("Bad Request")
      .setPayload({
        detail: "Invalid token",
      })
      .build();
      console.warn("Invalid token in request User registration");
      return res.status(400).json(response);
     }

      // * --------> Si la firma es valida
      const user = await User.findOne({email: decoded.email});


      // ! --------> Si el usuario no existe
      if(!user){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(404)
        .setMessage("Bad Request")
        .setPayload({
          detail: "User not found",
        })
        .build();
        console.warn("User not found in request User registration");
        return res.status(400).json(response);
      }

      // ! --------> Si el email ya esta verificado
      if(user.emailVerified){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setMessage("Bad Request")
        .setPayload({
          detail: "Email already verified",
        })
        .build();
        console.warn("Email already verified in request User registration");
        return res.status(400).json(response);
      }

      // * --------> Si el usuario existe, verificamos el email
      user.emailVerified = true;
      await user.save();

      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("OK")
        .setPayload({
          message: `Email ${user.email} verified`,
          user: user,
        })
        .build();

      //? -------> Enviamos respuesta
      console.warn(`Email ${user.email} verified`);
      return res.status(200).json(response);
  }
  // ! --------> Si hay un error
  catch(error){
    //Creamos respuesta
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    //? -------> Enviamos respuesta
    console.error(error.message);
    return res.status(500).json(response);
  }
}

//TODO ---------------------------------------> Inicio de sesion <---------------------------------------
const loginUserController = async (req, res) => {
  try{
    //Extraemos los datos del body
    const {email, password} = req.body;

    const user = await User.findOne({email}); 

      // ! --------> Si el usuario no existe
      if(!user){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(404)
        .setMessage("Bad Request")
        .setPayload({
          detail: "User not found",
        })
        .build();

        //? -------> Enviamos respuesta
        console.warn("User not found in request User login");
        return res.status(404).json(response);
      }

      // ! --------> Si el email no esta verificado
      if(user.emailVerified == false){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(403)
        .setMessage("Forbidden")
        .setPayload({
          detail: "Please verify your email to login",
        })
        .build();

        //? -------> Enviamos respuesta
        console.warn("Email not verified in request User login");
        return res.status(400).json(response);
      }

      // * --------> Si el usuario existe, comparamos las contraseñas
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      console.log(passwordMatch);
      if(!passwordMatch){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setMessage("Unauthorized")
        .setPayload({
          detail: "Incorrect password",
        })
        .build();

        //? -------> Enviamos respuesta
        console.warn("Incorrect password in request User login");
        return res.status(400).json(response);
      }


      // * --------> Si el usuario existe, creamos el token
      const token = jwt.sign({email: user.email, id:user._id}, ENVIROMENT.JWT_SECRET, {expiresIn: "1h"});
      const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage("OK")
        .setPayload({
          message: `User ${user.name} logged in`,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        })
        .build();

      //? -------> Enviamos respuesta
      console.warn(`User ${user.name} logged in`);
      return res.status(200).json(response);
  }
  // ! --------> Si hay un error
  catch(error){
    //Creamos respuesta
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage("Internal Server Error")
      .setPayload({
        detail: error.message,
      })
      .build();

    //? -------> Enviamos respuesta
    console.error(error.message);
    return res.status(500).json(response);
  }
}


export {registerUserController, verifyMailController, loginUserController};
