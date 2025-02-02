import backFetch from "../../utils/fetchHTTP.utils.js";
import customResponse from "../../utils/responseBuilder.utils.js";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired, isEmail, isStrongPassword } from "../../utils/fieldsValidator.utils.js";
 
// ^ --------> Function to handle the form submission
const handleSubmitRegister = async (e, values, setErrors) => {
  e.preventDefault();
  try {
    // ? -----> Validate form fields
    const nameError = isRequired(values.name);
    const emailError = isRequired(values.email) || isEmail(values.email);
    const passwordError = isRequired(values.password) || isStrongPassword(values.password);

    // ! -----> If name, email or password are missing
    if (nameError || emailError || passwordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError });
      return;
    }

    // ! -----> If name is too long
    if(values.name.length > 35){
      setErrors({ name: "Name is too long" });
      return;
    }

    // * -----> Create the body of the request
    const valuesBody = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    // # ---> Send form data to the server for registration
    const response = await backFetch({
      url: `${BACK_DIR}/api/auth/register`,
      method: "POST",
      headers: { "x-api-key": API_INTERNAL },
      body: valuesBody,
    });

    //Create a custom response
    const result = await customResponse(response, "Confirmation email sent to the adress", "Registration failed");

    //* ---> Registration successful
    if(result.success){
     setErrors({ general: "Confirmation email sent to the adress" });
    }
    
    // ! ---> Registration failed
    else{
      console.error("[Register] - An error occurred:", result.error.payload.detail);
      setErrors({ general:'Error: '+ result.error.payload.detail || "Registration failed. Please check your credentials." });
    }
  } 
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("[Register] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitRegister;
