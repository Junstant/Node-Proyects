import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
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
      url: `${BACK_DIR}/api/auth/delete-user`,
      method: 'PUT',
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
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
      console.error("[Delete] - An error occurred:", result.error.payload.detail);
      setErrors({ password: "Error: " + result.error.payload.detail || "Delete failed. Please check your credentials." });
    }
  }

  // ! -----> Unexpected error
  catch (error) {
    console.error("[Delete] - An error occurred:", error);
    setErrors({ password: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitDelete;