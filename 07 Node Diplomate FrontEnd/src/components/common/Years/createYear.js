import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { addYearToCareer, getNextYear } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the creation of a new year
const handleCreateYear = async (setCareers, setErrors, careerId, career, oldCareers) => {
  try {

    // ? -----> Validate form fields
    const id = isRequired(careerId);
    const year = getNextYear(career); 

    // ! -----> If the career has more than 20 years
    if(year === null) {
      setErrors({ career: "You cannot add more than 20 years" });
      return;
    }

    // ! -----> If id is missing
    if (id) {
      setErrors({ career: id });
      return;
    }

    // ! -----> If year is missing
    if (!year) {
      setErrors({ career: "The career does not exist" });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      careerId: careerId,
      year: year,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/year`,
      method: "POST",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Year created successfully", "Year creation failed");

    // * -----> Year created successfully
    if (result.success) {
      // Add the new year to the career
      setErrors({});
      const careers = oldCareers.map((career) => (career.id === careerId ? addYearToCareer(career, result.data.payload.year) : career));
      setCareers(careers);
    }

    // ! -----> Year creation failed
    else {
      setErrors({ career: result.message });
    }
  } catch (error) {
    console.error("[handleCreateYear] Error:", error);
    setErrors({ career: "An error occurred while creating the year" });
  }
};

export default handleCreateYear;
