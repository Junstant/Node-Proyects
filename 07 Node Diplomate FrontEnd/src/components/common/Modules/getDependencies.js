import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the get dependencies
const getDependencies = async (moduleIdRecieve) => {
  try {
    // ? -----> Validate module ID
    const moduleId = isRequired(moduleIdRecieve);

    // ! -----> If module ID is missing
    if (moduleId) {
      console.error("[getDependencies] Error: Module ID is missing");
      return;
    }

    // # ---> Send request to fetch dependencies
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/modules/dependencies?moduleId=${moduleIdRecieve}`,
      method: "GET",
      headers: {
        "x-api-key": ENVIROMENT.API_INTERNAL,
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    });

    // Create a custom response
    const result = await customResponse(response, "Dependencies loaded successfully", "Dependencies loading failed");

    // * -----> Process the dependencies if the request was successful
    if (result.success) {
      // Return the dependencies
      return result.data.payload.dependencies;
    }

    // ! -----> Dependencies loading failed
    else {
      console.error("[getDependencies] Error:", result.error.payload.detail);
      return [];
    }
  } catch (error) {
    //! -----> If there is an error, update the state
    console.error("[getDependencies] - An error occurred:", error);
    return [];
  }
};

export default getDependencies;