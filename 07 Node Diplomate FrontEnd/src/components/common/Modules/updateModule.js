import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import getSchedules from "./Schedules/getSchedules";

//^ --------> Function to handle the module update
const handleUpdateModule = async (setModules, setErrors, setActiveModule, oldModules, activeModule, newInfoModule) => {
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
      moduleId: activeModule._id,
      name: newInfoModule.name || activeModule.name,
      location: newInfoModule.location || activeModule.location,
      professor: newInfoModule.professor || activeModule.professor,
      state: newInfoModule.state || activeModule.state,
      period: {
        year: newInfoModule.period?.year || activeModule.period.year || "",
        semester: newInfoModule.period?.semester || activeModule.period.semester || "",
      },
      color: newInfoModule.color || activeModule.color,
    };

    // # ---> Send form data to the server
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/modules/`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Module updated successfully", "Module update failed");

    // * -----> Module updated successfully
    if (result.success) {
      setErrors({});
      // Fetch the schedules for the module
      const schedules = await getSchedules(activeModule._id);

      // Update the module
      const newModule = {
        _id: response.data.payload.module._id,
        name: response.data.payload.module.name,
        schedule: schedules,
        location: response.data.payload.module.location,
        professor: response.data.payload.module.professor,
        dependencies: response.data.payload.module.dependencies || [],
        state: response.data.payload.module.state,
        absents: response.data.payload.module.absents || [],
        period: {
          year: response.data.payload.module.period.year,
          semester: response.data.payload.module.period.semester,
        },
        color: response.data.payload.module.color,
        homeworks: response.data.payload.module.homeworks || [],
        notes: response.data.payload.module.notes || [],
        scheduleIds: response.data.payload.module.schedule,
        dependenciesIds: response.data.payload.module.dependencies,
        absentsIds: response.data.payload.module.absents,
        homeworksIds: response.data.payload.module.homeworks,
      };

      // # -> Update the module in the state
      const modules = oldModules.map((module) => (module._id === newModule._id ? newModule : module));
      setModules(modules);
      setActiveModule(newModule);
    }

    // ! -----> Module update failed
    else {
      setErrors({ module: result.error.payload.detail });
    }
  } catch (error) {
    // ! -----> If there is an error, update the state
    console.error("[handleUpdateModule] - An error occurred:", error);
    setErrors({ module: "An error occurred while updating the module" });
  }
};

export default handleUpdateModule;
