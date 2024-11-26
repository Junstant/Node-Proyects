import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { getOrdinalSuffix } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the retrieval of years
const handleGetYears = async (careerId, setErrors) => {
  try {
    // ? -----> Validate careerId
    const id = isRequired(careerId);

    // ! -----> If careerId is missing
    if (id) {
      setErrors({ career: id });
      return [];
    }

    // # ---> Send the request to fetch years
    const response = await backFetch({
      url: `http://localhost:3000/api/year?careerId=${careerId}`,
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
      }));
      return years; // Return the array of years
    } 
    
    // ! -----> Year retrieval failed
    else {
      setErrors({ career: result.message });
      return [];
    }

  } 
  // ! -----> If there is an error, update the state
  catch (error) {
    console.error("[handleGetYears] Error:", error);
    setErrors({ career: "An error occurred while retrieving the years" });
    return [];
  }
};

export default handleGetYears;
