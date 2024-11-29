import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../../config/enviroment.config";
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the get absents
const getAbsents = async (moduleIdRecieve) => {
    try {
        // ? -----> Validate module ID
        const moduleId = isRequired(moduleIdRecieve);
    
        // ! -----> If module ID is missing
        if (moduleId) {
        console.error("[getAbsents] Error: Module ID is missing");
        return;
        }
    
        // # ---> Send request to fetch absents
        const response = await backFetch({
        url: `${ENVIROMENT.BACK_DIR}/api/absent?moduleId=${moduleIdRecieve}`,
        method: "GET",
        headers: {
            "x-api-key": ENVIROMENT.API_INTERNAL,
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
        });
    
        // Create a custom response
        const result = await customResponse(response, "Absents loaded successfully", "Absents loading failed");
    
        // * -----> Process the absents if the request was successful
        if (result.success) {
        // Return the absents
        return result.data.payload.absents;
        }
    
        // ! -----> Absents loading failed
        else {
        console.error("[getAbsents] Error:", result.error.payload.detail);
        return [];
        }
    } catch (error) {
        //! -----> If there is an error, update the state
        console.error("[getAbsents] - An error occurred:", error);
        return [];
    }
}

export default getAbsents;