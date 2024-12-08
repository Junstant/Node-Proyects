import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the creation of an absent
const handleCreateAbsent = async (setModules, setErrors, setActiveModule, oldModules, activeModule, absentInfo) => {
    try {
        // ? -----> Validate module ID
        const moduleId = isRequired(activeModule._id);

        // ! -----> If module ID is missing
        if (moduleId) {
            setErrors({ module: moduleId });
            return;
        }

        // * -----> Create the body of the request
        const body = {
            "moduleId": activeModule._id,
            "absents": [
                {
                    "date": absentInfo.date,
                    "reason": absentInfo.reason,
                    "absenceNumber": absentInfo.absenceNumber
                }
            ]
        };

        // # ---> Send form data to the server
        const response = await backFetch({
            url: `${BACK_DIR}/api/absent/`,
            method: "POST",
            headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
            body,
        });

        // Create a custom response
        const result = await customResponse(response, "Absent created successfully", "Absent creation failed");

        // * -----> Absent created successfully
        if (result.success) {
            setErrors({});
            // Update the module
            const newModule = {
                ...activeModule,
                absents: [...activeModule.absents, result.data.payload.absent[0]],
            };
            const newModules = oldModules.map((module) => (module._id === activeModule._id ? newModule : module));
            setModules(newModules);
            setActiveModule(newModule);
        }

        // ! -----> Absent creation failed
        else {
            console.error("[handleCreateAbsent] - An error occurred:", result.error.payload.detail);
            setErrors({ module: result.error.payload.detail });
        }
    } catch (error) {
        //! -----> If there is an error, update the state
        console.error("[handleCreateAbsent] - An error occurred:", error);
    }
};

export default handleCreateAbsent;