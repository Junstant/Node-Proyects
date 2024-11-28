import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { getOrdinalSuffix } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the retrieval of years
const handleGetYears = async (careerId) => {
  try {
    // ? -----> Validate careerId
    const id = isRequired(careerId);

    // ! -----> If careerId is missing
    if (id) {
      console.error("[handleGetYears] Error: Career ID is missing");
      return [];
    }

    // # ---> Send the request to fetch years
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/year?careerId=${careerId}`,
      method: "GET",
      headers: { 
        "x-api-key": ENVIROMENT.API_INTERNAL, 
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Years retrieved successfully", "Year retrieval failed");

    // * -----> Process the years if the request was successful
    if (result.success) {
      // Map the years and generate the name with the ordinal suffix 
      const years = result.data.payload.years.map((year) => ({
        id: year._id,
        name: `${year.year}${getOrdinalSuffix(year.year)} year`, // Generate the name
        number: year.year,
        modules: year.modules || [],
      }));
      return years; // Return the array of years
    } 
    
    // ! -----> Year retrieval failed
    else {
      console.error("[handleGetYears] Error:", result.error.payload.detail);
      return [];
    }

  } 
  // ! -----> If there is an error, update the state
  catch (error) {
    console.error("[handleGetYears] - An error occurred:", error);
    return [];
  }
};

export default handleGetYears;
