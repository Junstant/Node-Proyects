import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { deleteYearFromCareer } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the deletion of a year
const handleDeleteYear = async (setCareers, setErrors, careerId, yearId, oldCareers) => {
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
      url: `${ENVIROMENT.BACK_DIR}/api/year`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
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
    }

    // ! -----> Year deletion failed
    else {
      setErrors({ career: result.message });
    }
  } catch (error) {
    // ! -----> If there is an error, update the state
    console.error("[handleDeleteYear] Error:", error);
    setErrors({ career: "An error occurred while deleting the year" });
  }
};

export default handleDeleteYear;
