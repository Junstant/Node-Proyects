import backFetch from "../../../../utils/fetchHTTP.utils";
import customResponse from "../../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the update of a schedule
const handleUpdateSchedule = async (setActiveModule, setModules, modules, setError, newScheduleInfo, scheduleId) => {
  try {
    // ? -----> Validate schedule ID
    const id = isRequired(scheduleId);

    // ! -----> If schedule ID is missing
    if (id) {
      setError({ schedule: id });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      id: scheduleId,
      schedule: [
        {
          name: newScheduleInfo.name,
          fromHr: newScheduleInfo.fromHr,
          toHr: newScheduleInfo.toHr,
        },
      ],
    };

    // # ---> Send form data to the server
    const response = await backFetch({
      url: `${BACK_DIR}/api/schedule/`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Schedule updated successfully", "Schedule update failed");

    // * -----> Schedule updated successfully
    if (result.success) {
      setError({ schedule: "" });
      // Update the module
      const updatedModule = modules.map((mod) => {
        if (mod.schedule.find((sch) => sch._id === scheduleId)) {
          return {
            ...mod,
            schedule: mod.schedule.map((sch) => {
              if (sch._id === scheduleId) {
                return {
                  ...sch,
                  days: sch.days.map((day) => ({
                    ...day,
                    fromHr: newScheduleInfo.fromHr,
                    toHr: newScheduleInfo.toHr,
                    name: newScheduleInfo.name,
                  })),
                };
              }
              return sch;
            }),
          };
        }
        return mod;
      });
      // Update the module
      setModules(updatedModule);

      // Update the active module
      const activeModule = updatedModule.find((mod) => mod.schedule.find((sch) => sch._id === scheduleId));
      setActiveModule(activeModule);
    } 
    
    // ! -----> Schedule update failed
    else {
       console.log(`Error updating schedule: ${result.message}`);
      setError({ schedule: result.message });
    }
  } catch (error) {
    // ! -----> Schedule update failed
    console.error("Error updating schedule:", error);
  }
};

export default handleUpdateSchedule;
