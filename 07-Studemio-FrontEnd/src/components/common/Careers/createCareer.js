import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the creation of a new career
const handleCreateCareer = async (setCareers, setErrors, user, oldCareers) => {
  try {
    // ? -----> Validate form fields
    const userId = isRequired(user.id);

    // ! -----> If userId is missing
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
      url: `${BACK_DIR}/api/career`,
      method: "POST",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
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
      const careers = [...oldCareers, newCareer];
      setCareers(careers);
    }

    // ! -----> Career creation failed
    else {
      console.error("[handleCreateCareer] Error:", result.message);
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
