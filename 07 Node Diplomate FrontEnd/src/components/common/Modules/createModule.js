import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the module creation
const handleCreateModule = async (setModules, setErrors, ActiveYear, oldModules, setActiveYear) => {
    try {
        // ? -----> Validate year ID
        const yearNum = isRequired(ActiveYear.id);
    
        // ! -----> If year number is missing
        if (yearNum) {
        setErrors({ module: yearNum });
        return;
        }
    
        // * -----> Create the body of the request
        const body = {
        yearId: ActiveYear.id
        };
    
        // # ---> Send form data to the server
        const response = await backFetch({
        url: `${ENVIROMENT.BACK_DIR}/api/modules`,
        method: "POST",
        headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        body,
        });
    
        // Create a custom response
        const result = await customResponse(response, "Module created successfully", "Module creation failed");
    
        // * -----> Module created successfully
        if (result.success) {
        setErrors({});
        // Create the module
        const newModule = {
            _id: result.data.payload.module._id,
            name: result.data.payload.module.name,
            schedule: [],
            location: result.data.payload.module.location,
            professor: result.data.payload.module.professor,
            dependencies: [],
            state: result.data.payload.module.state,
            absents: [],
            period: {
                year: result.data.payload.module.period.year,
                semester: result.data.payload.module.period.semester,
            },
            notes: [],
            homeworks: [],
            color: result.data.payload.module.color,
        };
        // Add the new module to the state
        const modules = [...(oldModules || []), newModule];
        setModules(modules);

        // Update the active year
        const newYear = {
            ...ActiveYear,
            modules: [...ActiveYear.modules, newModule._id],
        }
        setActiveYear(newYear);

        } 
        // ! -----> Module creation failed
        else {
        setErrors({ module: result.message });
        }
    } 
    
    // ! -----> If there is an error, update the state
    catch (error) {
        console.error("[handleCreateModule] Error:", error);
        setErrors({ module: "An error occurred while creating the module" });
    }
}

export default handleCreateModule;