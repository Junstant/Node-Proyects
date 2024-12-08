import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";
import { addYearToCareer, getNextYear } from "../../../utils/careerHelper.utils";

//^ --------> Function to handle the creation of a new year
const handleCreateYear = async (setCareers, setErrors, careerId, career, oldCareers, setActiveCareer) => {
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
      url: `${BACK_DIR}/api/year`,
      method: "POST",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
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

      // Update the active career
      setActiveCareer(careers.find((career) => career.id === careerId));
    }

    // ! -----> Year creation failed
    else {
      console.error("[handleCreateYear] Error:", result.message);
      setErrors({ career: result.message });
    }
  } catch (error) {
    console.error("[handleCreateYear] Error:", error);
    setErrors({ career: "An error occurred while creating the year" });
  }
};

export default handleCreateYear;
