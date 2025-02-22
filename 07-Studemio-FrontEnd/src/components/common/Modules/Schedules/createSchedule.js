import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the creation of a schedule
const handleCreateSchedule = async (setModules, setErrors, setActiveModule, oldModules, activeModule) => {
    try {
        // ? -----> Validate module ID
        const moduleId = isRequired(activeModule._id);

        // ! -----> If module ID is missing
        if (moduleId) {
            setErrors({ schedule: moduleId });
            return;
        }

        // * -----> Create the body of the request
        const body = {
            "moduleId": activeModule._id,
            "schedule": [
                {
                    "name": "Monday",
                    "fromHr": "19:00",
                    "toHr": "23:00"
                }
            ]
        };

        // # ---> Send form data to the server
        const response = await backFetch({
            url: `${BACK_DIR}/api/schedule/`,
            method: "POST",
            headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
            body,
        });

        // Create a custom response
        const result = await customResponse(response, "Schedule created successfully", "Schedule creation failed");

        // * -----> Schedule created successfully
        if (result.success) {
            setErrors({});
            // Update the module
            console.log(activeModule);
            console.log(result.data.payload.schedule);
            const newModule = {
                ...activeModule,
                schedule: [...activeModule.schedule, result.data.payload.schedule],
            };
            const newModules = oldModules.map((module) => (module._id === activeModule._id ? newModule : module));
            setModules(newModules);
            setActiveModule(newModule);
        }

        // ! -----> Schedule creation failed
        else {
            console.error("[handleCreateSchedule] - An error occurred:", result.error.payload.detail);
            setErrors({ schedule: result.error.payload.detail });
        }
    }
    // ! -----> If there is an error, update the state
    catch (error) {
        console.error("[handleCreateSchedule] - An error occurred:", error);
        setErrors({ schedule: "An error occurred while creating the schedule" });
    }
}

export default handleCreateSchedule;