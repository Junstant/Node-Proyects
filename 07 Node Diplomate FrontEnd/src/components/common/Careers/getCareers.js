import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";
import handleGetYears from "../Years/getYears";

//^ --------> Function to handle the get careers
const getCareers = async (setCareers, user) => {
  try {
    // ? -----> Validate user ID
    const userId = isRequired(user.id);

    // ! -----> If userId is missing
    if (userId) {
      console.error("[getCareers] Error: User ID is missing");
      return;
    }

    // # ---> Send request to fetch careers
    const response = await backFetch({
      url: `${BACK_DIR}/api/career?userId=${user.id}`,
      method: "GET",
      headers: {
        "x-api-key": API_INTERNAL,
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
          const years = await handleGetYears(career._id); // Fetch years for each career
          return {
            id: career._id,
            name: career.name,
            years,
          };
        })
      );
      // Update the state with the careers
      setCareers(careers);
    } 
    
    // ! -----> Careers loading failed
    else {
      console.error("[getCareers] Error:", result.error.payload.detail);
      setCareers([]);
    }
  } 
  
  //! -----> If there is an error, update the state
  catch (error) {
    console.error("[getCareers] - An error occurred:", error);
    setCareers([]);
  }
};

export default getCareers;
