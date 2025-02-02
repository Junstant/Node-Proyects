import backFetch from "../../utils/fetchHTTP.utils.js";
import customResponse from "../../utils/responseBuilder.utils.js";
import { isRequired, isEmail } from "../../utils/fieldsValidator.utils.js";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;

// ^ --------> Function to handle the form submission
const handleSubmitForgotPassword = async (e, values, setErrors) => {
  e.preventDefault();

  try {
    // ? -----> Validate form fields
    const emailError = isRequired(values.email) || isEmail(values.email);

    // ! -----> If there are validation errors, stop execution
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    // * -----> Create the body of the request
    const valuesBody = {
      email: values.email,
    };

    // # ---> Send form data to the server for password recovery
    const response = await backFetch({
      url: `${BACK_DIR}/api/auth/forgot-password`,
      method: "POST",
      headers: { "x-api-key": API_INTERNAL },
      body: valuesBody,
    });

    //Create a custom response
    const result = await customResponse(response, "Email sent", "Password recovery failed");

    //* ---> Password recovery successful
    if (result.success) {
      //Aca podrias redirigir a otra pagina o mostrar un mensaje de exito
      setErrors({ general: "Email sent" });
    }
    // ! ---> Password recovery failed
    else {
      console.error("[ForgotPassword] - An error occurred:", result.error.payload.detail);
      setErrors({ general: "Error: " + result.error.payload.detail || "Password recovery failed. Please check your credentials." });
    }
  }
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("[ForgotPassword] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitForgotPassword;
