import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import getSchedules from "./Schedules/getSchedules";
import getDependencies from "./getDependencies";
import getAbsents from "./Absents/getAbsents";

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
      url: `${ENVIROMENT.BACK_DIR}/api/modules?yearId=${year.id}`,
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
      const modules = await Promise.all(
        result.data.payload.modules.map(async (module) => {
          const schedules = await getSchedules(module._id);
          const dependencies = await getDependencies(module._id);
          const absents = await getAbsents(module._id);
        //   const homeworks = await getHomeworks(module._id);
        //   const notes = await getNotes(module._id);
          return {
            _id: module._id,
            name: module.name,
            schedule: schedules,
            location: module.location,
            professor: module.professor,
            dependencies: dependencies || [],
            state: module.state,
            absents: absents || [],
            period: {
              year: module.period.year,
              semester: module.period.semester,
            },
            color: module.color,
            homeworks: module.homeworks || [],
            notes: module.notes || [],
            scheduleIds: module.schedule,
            dependenciesIds: module.dependencies,
            absentsIds: module.absents,
            homeworksIds: module.homeworks,
          };
        })
      );

      setModules(modules);
    }

    // ! -----> Modules loading failed
    else {
      console.error("[getModules] Error:", result.error.payload.detail);
      setModules([]);
    }
  } catch (error) {
    //! -----> If there is an error, update the state
    console.error("[getModules] - An error occurred:", error);
    setModules([]);
  }
};

export default getModules;
