import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the form submission
const handleCreateCareer = async (setCareers, setErrors, user) => {
  try {
    // ? -----> Validate form fields
    const userId = isRequired(user.id);

    // ! -----> If there are validation errors, update the state and stop execution
    if (userId) {
      setErrors({ career: userId });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      name: "New career",
      userId: user.id,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: "http://localhost:3000/api/career",
      method: "POST",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Career created successfully", "Career creation failed");

    // * -----> Career created successfully
    if (result.success) {
      setErrors({});
      // Create the career
      const newCareer = {
        id: result.data.payload.career._id,
        name: result.data.payload.career.name,
        years: [],
      };
      // Add the new career to the state
      setCareers((prev) => [...prev, newCareer]);
    }

    // ! -----> Career creation failed
    else {
      setErrors({ career: result.message });
    }
}
    // ! -----> If there is an error, update the state
    catch (error) {
    console.error("[handleCreateCareer] Error:", error);
    setErrors({ career: "An error occurred while creating the career" });
  }
};

export default handleCreateCareer;
