import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
import ENVIROMENT from "../../config/enviroment.config";
import { isRequired } from "../../utils/fieldsValidator.utils";

//^ --------> Function to handle the form submission
const handleSubmitDelete = async (e, values, setErrors, user, navigate) => {
  // Prevent the default behavior of the form
  e.preventDefault();
  try {
    // ? -----> Validate form fields
    const passwordError = isRequired(values.deletePassword);

    // ! -----> If there are validation errors, update the state and stop execution
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }

    // * -----> Create the body of the request
    const valuesBody = {
      email: user.email,
      password: values.deletePassword,
    };

    console.log(valuesBody)

    // # ---> Send form data to backend for delete
    const response = await backFetch({
      url: "http://localhost:3000/api/auth/delete-user",
      method: 'POST',
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body: valuesBody,
    });

    // Create a custom response
    const result = await customResponse(response, "User deleted successfully", "Delete failed");

    //* ---> Delete successful
    if (result.success) {
      // Clear errors if login is successful
      setErrors({});

      // Make a redirect to the login page
      navigate("/");
    }

    // ! ---> Delete failed
    else {
      setErrors({ general: "Error: " + result.error.payload.detail || "Delete failed. Please check your credentials." });
    }
  }

  // ! -----> Unexpected error
  catch (error) {
    console.error("[Delete] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitDelete;