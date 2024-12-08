import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the delete of an absent
const handleDeleteAbsent = async (setModules, setErrors, setActiveModule, oldModules, activeModule, absentId) => {
    try {
        // ? -----> Validate absent ID
        const id = isRequired(absentId);

        // ! -----> If absent ID is missing
        if (id) {
            setErrors({ absent: id });
            return;
        }

        // * -----> Create the body of the request
        const body = {
            id: absentId,
            moduleId: activeModule._id,
        };

        // # ---> Send form data to the server
        const response = await backFetch({
            url: `${BACK_DIR}/api/absent/delete`,
            method: "PUT",
            headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
            body,
        });

        // Create a custom response
        const result = await customResponse(response, "Absent deleted successfully", "Absent deletion failed");

        // * -----> Absent deleted successfully
        if (result.success) {
            setErrors({});
            // Update the module
            const newModule = {
                ...activeModule,
                absents: activeModule.absents.filter((abs) => abs._id !== absentId),
            };
            const newModules = oldModules.map((module) => (module._id === activeModule._id ? newModule : module));
            setModules(newModules);
            setActiveModule(newModule);
        }

        // ! -----> Absent deletion failed
        else {
            console.error("[handleDeleteAbsent] - An error occurred:", result.error.payload.detail);
            setErrors({ absent: result.error.payload.detail });
        }
    } catch (error) {
        console.error("[handleDeleteAbsent] - An error occurred:", error);
        setErrors({ absent: "An error occurred" });
    }
}

export default handleDeleteAbsent;