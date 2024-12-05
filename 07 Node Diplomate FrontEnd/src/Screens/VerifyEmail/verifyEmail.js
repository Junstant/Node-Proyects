import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
import ENVIROMENT from "../../config/enviroment.config";
import { isRequired } from "../../utils/fieldsValidator.utils";
//^ --------> Function to handle the form submission
const handleVerifyEmail = async (token, setError, navigate) => {

  try {
    // ? -----> Validate form fields
    const tokenError = isRequired(token);
    // ! -----> If token is missing
    if (tokenError) {
      setError({ general: tokenError });
      return;
    }
    // # ---> Send form data to the server for email verification
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/auth/verify/${token}`,
      method: "GET",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL },
    });
    // Create a custom response
    const result = await customResponse(response, "Email verified successfully", "Email verification failed");
    //* ---> Email verification successful
    if (result.success) {
      // Clear errors if verification is successful
      setError({success: 'Email verified successfully'});
      // Make a redirect to the login page
      setTimeout(() => navigate("/login"), 9000);
    }
    // ! ---> Email verification failed
    else {
      console.error("[VerifyEmail] - An error occurred:", result.error.payload.detail);
      setError({ general: result.error.payload.detail || "Email verification failed. Please try again." });

      // Make a redirect to the login page
      setTimeout(() => navigate("/login"), 9000);
    }
  }
  // ! -----> Unexpected error
  catch (error) {
    console.error("[VerifyEmail] - An error occurred:", error);
    setError({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleVerifyEmail;