import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the get schedules
const getSchedules = async (moduleIdRecieve) => {
  try {
    // ? -----> Validate module ID
    const moduleId = isRequired(moduleIdRecieve);

    // ! -----> If module ID is missing
    if (moduleId) {
      console.error("[getSchedules] Error: Module ID is missing");
      return;
    }

    // # ---> Send request to fetch schedules
    const response = await backFetch({
      url: `${BACK_DIR}/api/schedule?moduleId=${moduleIdRecieve}`,
      method: "GET",
      headers: {
        "x-api-key": API_INTERNAL,
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Schedules loaded successfully", "Schedules loading failed");

    // * -----> Process the schedules if the request was successful
    if (result.success) {
      // Return the schedules
      return result.data.payload.schedules;
    }

    // ! -----> Schedules loading failed
    else {
      console.error("[getSchedules] Error:", result.error.payload.detail);
      return [];
    }
  } catch (error) {
    //! -----> If there is an error, update the state
    console.error("[getSchedules] - An error occurred:", error);
    return [];
  }
};

export default getSchedules;
