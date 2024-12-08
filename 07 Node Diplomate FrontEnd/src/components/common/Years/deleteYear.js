import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { deleteYearFromCareer } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the deletion of a year
const handleDeleteYear = async (setCareers, setErrors, careerId, yearId, oldCareers, setActiveCareer, setActiveYear, activeYear, setActiveModule) => {
  try {
    // ? -----> Validate form fields
    const id = isRequired(careerId);
    const year = isRequired(yearId);

    // ! -----> If careerId or yearId are missing
    if (id || year) {
      setErrors({ career: id, year });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      careerId: careerId,
      year: yearId,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${BACK_DIR}/api/year`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Year deleted successfully", "Year deletion failed");
    
    // * -----> Year deleted successfully
    if (result.success) {
      // Remove the year from the career and update the state
      setErrors({});
      const careers = oldCareers.map((career) => (career.id === careerId ? deleteYearFromCareer(career, yearId) : career));
      setCareers(careers);

      // Update the active career
      setActiveCareer(careers.find((career) => career.id === careerId));

      // Remove the year from the active year if it is the same
      if (activeYear.number === yearId) {

        // Update the active module
        setActiveModule(null);

        // Update the active year
        setActiveYear(null);
      }
    }

    // ! -----> Year deletion failed
    else {
      console.error("[handleDeleteYear] Error:", result.message);
      setErrors({ career: result.message });
    }
  } catch (error) {
    // ! -----> If there is an error, update the state
    console.error("[handleDeleteYear] Error:", error);
    setErrors({ career: "An error occurred while deleting the year" });
  }
};

export default handleDeleteYear;
