import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../../config/enviroment.config";
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the delete of a schedule
const handleDeleteSchedule = async (setModules, setErrors, setActiveModule, oldModules, activeModule, scheduleId) => {
  try {
    // ? -----> Validate schedule ID
    const id = isRequired(scheduleId);

    // ! -----> If schedule ID is missing
    if (id) {
      setErrors({ schedule: id });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      id: scheduleId,
      moduleId: activeModule._id,
    };

    // # ---> Send form data to the server
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/schedule/delete`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Schedule deleted successfully", "Schedule deletion failed");

    // * -----> Schedule deleted successfully
    if (result.success) {
      setErrors({});
      // Update the module
      const newModule = {
        ...activeModule,
        schedule: activeModule.schedule.filter((sch) => sch._id !== scheduleId),
      };
      const newModules = oldModules.map((module) => (module._id === activeModule._id ? newModule : module));
      setModules(newModules);
      setActiveModule(newModule);
    }

    // ! -----> Schedule deletion failed
    else {
      console.error("[handleDeleteSchedule] - An error occurred:", result.error.payload.detail);
      setErrors({ schedule: result.error.payload.detail });
    }
  } catch (error) {
    console.error("[handleDeleteSchedule] - An error occurred:", error);
    setErrors({ schedule: "An error occurred" });
  }
};

export default handleDeleteSchedule;
