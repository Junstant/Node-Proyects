import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the deletion of a module
const handleDeleteModule = async (setModules, setErrors, moduleId, year, oldModules, setActiveModule, setActiveYear, activeYear, setActiveCareer, oldCareer) => {
  try {
    // ? -----> Validate form fields
    const id = isRequired(moduleId);

    // ! -----> If module is missing
    if (id) {
      setErrors({ module: id });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      moduleId: moduleId,
      yearId: year.id,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${BACK_DIR}/api/modules/delete`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Module deleted successfully", "Module deletion failed");

    // * -----> Module deleted successfully
    if (result.success) {
      // Delete the module from the state
      setErrors({});
      const modules = oldModules.filter((module) => module._id !== moduleId);
      setModules(modules);

      // Update the active module
      setActiveModule(null);

      // Update the active year filtering the deleted module id
      const newYear = {
        id: year.id,
        name: year.name,
        modules: year.modules.filter((module) => module !== moduleId),
      };

      setActiveYear(newYear);

      const yearsUpdated = oldCareer.years.map((year) => (year.id === activeYear.id ? newYear : year));

      // Update the active career
      const newCareer = {
        id: oldCareer.id,
        name: oldCareer.name,
        years: yearsUpdated,
      };

      setActiveCareer(newCareer);
    }

    // ! -----> Module deletion failed
    else {
      setErrors({ module: result.message });
      console.error("[handleDeleteModule] Error:", result.message);
    }
  } catch (error) {
    // ! -----> Error handling
    console.error("[handleDeleteModule] Error:", error);
    setErrors({ module: "An error occurred while deleting the module" });
  }
};

export default handleDeleteModule;
