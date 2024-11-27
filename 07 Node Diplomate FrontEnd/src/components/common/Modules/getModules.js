import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the get modules
const getModules = async (setModules, year) => {
    try {
        // ? -----> Validate year ID
        const yearId = isRequired(year.id);

        // ! -----> If yearId is missing
        if (yearId) {
        console.error("[getModules] Error: Year ID is missing");
        return;
        }
    
        // # ---> Send request to fetch modules
        const response = await backFetch({
        url: `http://localhost:3000/api/modules?yearId=${year.id}`,
        method: "GET",
        headers: {
            "x-api-key": ENVIROMENT.API_INTERNAL,
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
        });
    
        // Create a custom response
        const result = await customResponse(response, "Modules loaded successfully", "Modules loading failed");
    
        // * -----> Process the modules if the request was successful
        if (result.success) {
        // Update the state with the modules
        setModules(result.data.payload.modules);
        } 
        
        // ! -----> Modules loading failed
        else {
        console.error("[getModules] Error:", result.error.payload.detail);
        setModules([]);
        }
    } 
    
    //! -----> If there is an error, update the state
    catch (error) {
        console.error("[getModules] - An error occurred:", error);
        setModules([]);
    }
}

export default getModules;