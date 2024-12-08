import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the update of an absent
const handleUpdateAbsent = async (setActiveModule, setModules, OldModules, setError, newAbsentInfo, absentId, activeModule) => {
  try {
    // ? -----> Validate module ID
    const moduleId = isRequired(activeModule._id);

    // ! -----> If module ID is missing
    if (moduleId) {
      setError({ module: moduleId });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      id: absentId,
      absent: {
        date: newAbsentInfo.date,
        reason: newAbsentInfo.reason,
        absenceNumber: newAbsentInfo.absenceNumber,
      },
    };

    // # ---> Send form data to the server
    const response = await backFetch({
      url: `${BACK_DIR}/api/absent/`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Absent updated successfully", "Absent update failed");

    // * -----> Absent updated successfully
    if (result.success) {
      setError({});
      // Update the module
      const newModule = {
        ...activeModule,
        absents: activeModule.absents.map((absent) => (absent._id === absentId ? result.data.payload.absent : absent)),
      };
      const newModules = OldModules.map((module) => (module._id === activeModule._id ? newModule : module));
      setModules(newModules);
      setActiveModule(newModule);
    }

    // ! -----> Absent update failed
    else {
      console.error("[handleUpdateAbsent] - An error occurred:", result.error.payload.detail);
      setError({ module: result.error.payload.detail });
    }
  } catch (error) {
    //! -----> If there is an error, update the state
    console.error("[handleUpdateAbsent] - An error occurred:", error);
    setError({ module: "An error occurred" });
  }
};
export default handleUpdateAbsent;
