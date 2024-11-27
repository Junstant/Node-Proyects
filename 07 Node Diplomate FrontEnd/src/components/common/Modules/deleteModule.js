import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the deletion of a module
const handleDeleteModule = async (setModules, setErrors, moduleId, year, oldModules, setActiveModule, setActiveYear, activeYear) => {
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
      url: `http://localhost:3000/api/modules/delete`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Module deleted successfully", "Module deletion failed");

    // * -----> Module deleted successfully
    if (result.success) {
      // Delete the module from the state
      setErrors({});
      const modules = oldModules.filter((module) => module.id !== moduleId);
      setModules(modules);
      setActiveModule(null);
      // Update the active year
      const newYear = {
        ...activeYear,
        modules: activeYear.modules.filter((module) => module.id !== moduleId),
      }
      setActiveYear(newYear);
    }

    // ! -----> Module deletion failed
    else {
      setErrors({ module: result.message });
    }
  } catch (error) {
    // ! -----> Error handling
    console.error("[handleDeleteModule] Error:", error);
    setErrors({ module: "An error occurred while deleting the module" });
  }
};

export default handleDeleteModule;
