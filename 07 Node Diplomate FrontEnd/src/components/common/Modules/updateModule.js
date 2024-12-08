import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";
import getSchedules from "./Schedules/getSchedules";
import getDependencies from "./getDependencies";
import getAbsents from "./Absents/getAbsents";

//^ --------> Function to handle the module update
const handleUpdateModule = async (setModules, setErrors, setActiveModule, oldModules, activeModule, newInfoModule) => {
  try {
    // ? -----> Validate module ID
    const moduleId = isRequired(activeModule._id);

    // ! -----> If module ID is missing
    if (moduleId) {
      setErrors({ edit: moduleId });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      moduleId: activeModule._id,
      name: newInfoModule.name || activeModule.name,
      location: newInfoModule.location || activeModule.location,
      dependencies: newInfoModule.dependencies || activeModule.dependencies,
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
      url: `${BACK_DIR}/api/modules/`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Module updated successfully", "Module update failed");

    // * -----> Module updated successfully
    if (result.success) {
      setErrors({});
      // Fetch the schedules for the module
      const schedules = await getSchedules(activeModule._id);
      const dependencies = await getDependencies(activeModule._id);
      const absents = await getAbsents(activeModule._id);


      // Update the module
      const newModule = {
        ...activeModule,
        _id: response.data.payload.module._id,
        name: response.data.payload.module.name,
        schedule: schedules || [],
        location: response.data.payload.module.location,
        professor: response.data.payload.module.professor,
        dependencies: dependencies || [],
        state: response.data.payload.module.state,
        absents: absents || [],
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
      console.error("[handleUpdateModule] - An error occurred:", result.error.payload.detail);
      setErrors({ edit: result.error.payload.detail });
    }
  } catch (error) {
    // ! -----> If there is an error, update the state
    console.error("[handleUpdateModule] - An error occurred:", error);
    setErrors({ edit: "An error occurred while updating the module" });
  }
};

export default handleUpdateModule;
