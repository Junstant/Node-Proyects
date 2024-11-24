import backFetch from "../../utils/fetchHTTP.utils.js";
import customResponse from "../../utils/responseBuilder.utils.js";
import ENVIROMENT from "../../config/enviroment.config.js";
import { isRequired, isStrongPassword } from "../../utils/fieldsValidator.utils.js";


// ^ --------> Function to handle the form submission
const handleSubmitResetPassword = async (e, values, setErrors, token) => {
  e.preventDefault();
  try {
    // ? -----> Validate form fields
    const passwordError = isRequired(values.password) || isStrongPassword(values.password);
    const confirmPasswordError = isRequired(values.confirmPassword) || isStrongPassword(values.confirmPassword);

    // ! -----> If there are validation errors, stop execution
    if (passwordError || confirmPasswordError) {
      setErrors({ password: passwordError, confirmPassword: confirmPasswordError });
      return;
    }

    //! -----> If the passwords do not match, stop execution
    if (values.password !== values.confirmPassword) {
      setErrors({ general: "Passwords do not match" });
      return;
    }

    // * -----> Create the body of the request
    const valuesBody = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    // # ---> Send form data to the server for password recovery
    const response = await backFetch({
      url: "http://localhost:3000/api/auth/reset-password/" + token,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL },
      body: valuesBody,
    });

    //Create a custom response
    const result = await customResponse(response, "Password changed", "Password change failed");

    //* ---> Password change successful
    if (result.success) {
      //Aca podrias redirigir a otra pagina o mostrar un mensaje de exito
      setErrors({ general: "Password changed" });
    }
    // ! ---> Password change failed
    else {
      setErrors({ general: "Error: " + result.error.payload.detail || "Password change failed. Please check your credentials." });
    }
  }
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("[ResetPassword] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitResetPassword;
