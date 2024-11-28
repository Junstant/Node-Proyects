import backFetch from "../../utils/fetchHTTP.utils.js";
import customResponse from "../../utils/responseBuilder.utils.js";
import ENVIROMENT from "../../config/enviroment.config.js";
import { isRequired, isEmail } from "../../utils/fieldsValidator.utils.js";
//^ --------> Function to handle the form submission
const handleSubmitLogin = async (e, values, setErrors, setUser, setUserTokenFunc, navigate) => {
  // Prevent the default behavior of the form
  e.preventDefault();
  try {

    // ? -----> Validate form fields
    const emailError = isRequired(values.email) || isEmail(values.email);
    const passwordError = isRequired(values.password)
  
    // ! -----> If email or password are missing
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // * -----> Create the body of the request
    const valuesBody = {
      email: values.email,
      password: values.password,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/auth/login`,
      method: "POST",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL },
      body: valuesBody,
    });
    // Create a custom response
    const result = await customResponse(response, "User logged in successfully", "Login failed");
    
    //* ---> Login successful
    if (result.success) {
      // Clear errors if login is successful
      setErrors({});
      
      // Save the token in the local storage
      setUserTokenFunc(result.data.payload.token);
      setUser(result.data.payload.user);

      // Make a redirect to the dashboard
      navigate("/app");
    } 
    
    // ! ---> Login failed
    else {
      console.error("[Login] - An error occurred:", result.error.payload.detail);
      setErrors({ general:'Error: '+ result.error.payload.detail || "Login failed. Please check your credentials." });
    }
  } 

  // ! -----> Unexpected error
  catch (error) {
    console.error("[Login] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitLogin;
