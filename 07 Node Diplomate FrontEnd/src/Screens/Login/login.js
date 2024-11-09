import backFetch from "../../utils/fetchHTTP.utils.js";
import customResponse from "../../utils/responseBuilder.utils.js";

// :: --------> Function to handle the form submission
const handleSubmitLogin = async (e, values) => {
  e.preventDefault();

  try {
    // Send form data to the server for registration
    const response = await backFetch("http://localhost:3000/api/auth/login", "POST", values);

    //Create a custom response
    const result = await customResponse(response, "User logged in successfully", "Login failed");

    if(result.success){
     //Aca podrias redirigir a otra pagina o mostrar un mensaje de exito
    }
    else{
      console.error("Login failed:", result.error);
    }

  } 
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("An error occurred:", error);
  }
};

export default handleSubmitLogin;
