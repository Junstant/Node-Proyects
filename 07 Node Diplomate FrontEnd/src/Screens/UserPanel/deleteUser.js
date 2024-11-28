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

    // ! -----> If password is missing
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
      url: `${ENVIROMENT.BACK_DIR}/auth/delete-user`,
      method: 'PUT',
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body: valuesBody,
    });

    // Create a custom response
    const result = await customResponse(response, "User deleted successfully", "Delete failed");

    //* ---> Delete successful
    if (result.success) {
      // Clear errors and navigate to the home page
      setErrors({});
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