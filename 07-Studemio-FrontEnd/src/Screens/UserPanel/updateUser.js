import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired, isStrongPassword } from "../../utils/fieldsValidator.utils";

//^ --------> Function to handle the form submission
const handleSubmitUpdate = async (e, values, setErrors, user) => {
  // Prevent the default behavior of the form
  e.preventDefault();
  try {
    // ? -----> Validate form fields
    const nameError = isRequired(values.name);
    const oldPasswordError = isRequired(values.oldPassword) || isStrongPassword(values.oldPassword);
    const newPasswordError = isRequired(values.newPassword) || isStrongPassword(values.newPassword);

    // ! -----> If name, oldPassword or newPassword are missing
    if (nameError || oldPasswordError || newPasswordError) {
      setErrors({ name: nameError, oldPassword: oldPasswordError, newPassword: newPasswordError });
      return;
    }

    // * -----> Create the body of the first request
    const firstBody = {
      password: values.oldPassword,
      email: user.email,
    };

    // # ---> Send form data to the server for login
    const firstResponse = await backFetch({
      url: `${BACK_DIR}/api/auth/login`,
      method: "POST",
      headers: { "x-api-key": API_INTERNAL },
      body: firstBody,
    });

    // Create a custom response
    const firstResult = await customResponse(firstResponse, "Password match", "Password does not match");

    //* ---> Password match
    if (firstResult.success) {
      // Clear errors if login is successful
      setErrors({});

      // * -----> Create the body of the second request
      const secondBody = {
        name: values.name,
        email: user.email,
        password: values.newPassword,
      };

      // # ---> Send form data to the server for login
      const secondResponse = await backFetch({
        url: `${BACK_DIR}/api/auth/update-user`,
        method: "PUT",
        headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        body: secondBody,
      });

      // Create a custom response
      const secondResult = await customResponse(secondResponse, "User updated successfully", "User update failed");

      //* ---> Update successful
      if (secondResult.success) {
        // Clear errors if login is successful
        setErrors({general: "User updated successfully"});
      }

      // ! ---> Update failed
      else {
        console.error("[Update] - An error occurred:", secondResult.error.payload.detail);
        setErrors({ general: "Error: " + secondResult.error.payload.detail || "User update failed. Please check your credentials." });
      }
    }

    // ! ---> Password does not match
    else {
      console.error("[Update] - An error occurred:", firstResult.error.payload.detail);
      setErrors({ general: "Error: " + firstResult.error.payload.detail || "Password does not match. Please check your credentials." });
    }
  } 
  
  // ! -----> Unexpected error
  catch (error) {
    console.error("[Update] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitUpdate;
