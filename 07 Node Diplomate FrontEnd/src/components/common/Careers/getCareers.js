import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the get careers
const getCareers = async (setCareers, setErrors, user) => {
  try {
    // ? -----> Validate form fields
    const userId = isRequired(user.id);

    // ! -----> If there are validation errors, update the state and stop execution
    if (userId) {
      setErrors({ career: userId });
      return;
    }

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `http://localhost:3000/api/career?userId=${user.id}`,
      method: "GET",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    });

    // Create a custom response
    const result = await customResponse(response, "Careers loaded successfully", "Careers loading failed");

    // * -----> Careers loaded successfully
    if (result.success) {
      setErrors({});
      // Create the career
      const careers = result.data.payload.careers.map((career) => ({
        id: career._id,
        name: career.name,
        years: career.years,
      }));
      // Add the new career to the state
      setCareers(careers);
    }

    // ! -----> Careers loading failed
    else {
      setErrors({ career: result.message });
    }
  }
  // ! -----> If there is an error, update the state
  catch (error) {
    console.error("[getCareers] Error:", error);
    setErrors({ career: "An error occurred while loading the careers" });
  }
};

export default getCareers;