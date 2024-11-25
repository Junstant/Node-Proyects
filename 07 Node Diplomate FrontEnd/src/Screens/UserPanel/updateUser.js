import backFetch from "../../utils/fetchHTTP.utils";
import customResponse from "../../utils/responseBuilder.utils";
import ENVIROMENT from "../../config/enviroment.config";
import { isRequired, isStrongPassword } from "../../utils/fieldsValidator.utils";
import useUserStore from "../../stores/userStore";

//^ --------> Function to handle the form submission
const handleSubmitUpdate = async (e, values, setErrors, user) => {
  // Prevent the default behavior of the form
  e.preventDefault();
  try {
    // ? -----> Validate form fields
    const nameError = isRequired(values.name);
    const oldPasswordError = isRequired(values.oldPassword) || isStrongPassword(values.oldPassword);
    const newPasswordError = isRequired(values.newPassword) || isStrongPassword(values.newPassword);

    // ! -----> If there are validation errors, update the state and stop execution
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
      url: "http://localhost:3000/api/auth/login",
      method: "POST",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL },
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
        url: "http://localhost:3000/api/auth/update-user",
        method: "PUT",
        headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        body: secondBody,
      });

      // Create a custom response
      const secondResult = await customResponse(secondResponse, "User updated successfully", "User update failed");

      //* ---> Update successful
      if (secondResult.success) {
        // Clear errors if login is successful
        setErrors({});
      }

      // ! ---> Update failed
      else {
        setErrors({ general: "Error: " + secondResult.error.payload.detail || "User update failed. Please check your credentials." });
      }
    }

    // ! ---> Password does not match
    else {
      setErrors({ general: "Error: " + firstResult.error.payload.detail || "Password does not match. Please check your credentials." });
    }
  } catch (error) {
    // ! -----> Unexpected error
    console.error("[Update] - An error occurred:", error);
    setErrors({ general: "An unexpected error occurred. Please try again later." });
  }
};

export default handleSubmitUpdate;
