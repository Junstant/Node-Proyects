import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the update of a career
const handleUpdateCareer = async (setCareers, setErrors, careerId, newName, oldCareers, setActiveCareer) => {
  try {
    // ? -----> Validate form fields
    const id = isRequired(careerId);
    const name = isRequired(newName);


    // ! -----> If career is missing
    if (id) {
      setErrors({ career: id });
      return;
    }

    // ! -----> If name is missing
    if (name) {
      setErrors({ career: name });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      careerId: careerId,
      newName: newName,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${ENVIROMENT.BACK_DIR}/api/career/`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Career updated successfully", "Career update failed");

    // * -----> Career updated successfully
    if (result.success) {
      // Update the career in the state
      setErrors({});
      const careers = oldCareers.map((career) => (career.id === careerId ? { ...career, name: newName } : career));
      setCareers(careers);

      // Update the career in the local storage
      const newCareer = careers.find((career) => career.id === careerId);
      setActiveCareer(newCareer);
    }

    // ! -----> Career update failed
    else {
      console.error("[handleUpdateCareer] Error:", result.message);
      setErrors({ career: result.message });
    }
  } 
  // ! -----> If there is an error, update the state
  catch (error) {
    console.error("[handleUpdateCareer] Error:", error);
    setErrors({ career: "An error occurred while updating the career" });
  }
};

export default handleUpdateCareer;