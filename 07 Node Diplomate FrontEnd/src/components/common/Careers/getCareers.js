import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import handleGetYears from "../Years/getYears";

//^ --------> Function to handle the get careers
const getCareers = async (setCareers, setErrors, user) => {
  try {
    // ? -----> Validate user ID
    const userId = isRequired(user.id);

    // ! -----> If userId is missing
    if (userId) {
      setErrors({ career: userId });
      return;
    }

    // # ---> Send request to fetch careers
    const response = await backFetch({
      url: `http://localhost:3000/api/career?userId=${user.id}`,
      method: "GET",
      headers: {
        "x-api-key": ENVIROMENT.API_INTERNAL,
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Careers loaded successfully", "Careers loading failed");

    // * -----> Process the careers if the request was successful
    if (result.success) {
      // Fetch years for each career
      const careers = await Promise.all(
        result.data.payload.careers.map(async (career) => {
          const years = await handleGetYears(career._id, setErrors); // Fetch years for each career
          return {
            id: career._id,
            name: career.name,
            years,
          };
        })
      );
      // Update the state with the careers
      setCareers(careers);
      setErrors({});
    } 
    
    // ! -----> Careers loading failed
    else {
      setErrors({ career: result.message });
    }
  } 
  
  //! -----> If there is an error, update the state
  catch (error) {
    console.error("[getCareers] Error:", error);
    setErrors({ career: "An error occurred while loading the careers" });
  }
};

export default getCareers;
