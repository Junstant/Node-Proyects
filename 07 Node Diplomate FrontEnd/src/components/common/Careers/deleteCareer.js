import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
const API_INTERNAL = import.meta.env.VITE_API_INTERNAL;
const BACK_DIR = import.meta.env.VITE_BACK_DIR;
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the deletion of a career
const handleDeleteCareer = async (setCareers, setErrors, careerId, user, oldCareers, setActiveCareer, activeCareer, setActiveModule, setActiveYear) => {
  try {
    // ? -----> Validate form fields
    const id = isRequired(careerId);
    const userId = isRequired(user.id);

    // ! -----> If career is missing
    if (id) {
      setErrors({ career: id });
      return;
    }

    // ! -----> If user is missing
    if (userId) {
      setErrors({ career: userId });
      return;
    }

    // * -----> Create the body of the request
    const body = {
      careerId: careerId,
      userId: user.id,
    };

    // # ---> Send form data to the server for login
    const response = await backFetch({
      url: `${BACK_DIR}/api/career/delete`,
      method: "PUT",
      headers: { "x-api-key": API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      body,
    });

    // Create a custom response
    const result = await customResponse(response, "Career deleted successfully", "Career deletion failed");

    // * -----> Career deleted successfully
    if (result.success) {
      // Delete the career from the state
      setErrors({});
      const careers = oldCareers.filter((career) => career.id !== careerId);
      setCareers(careers);

      //Remove the active career if it is the same
      if (activeCareer.id === careerId) {

        // Update the active module
        setActiveModule(null);

        // Update the active year
        setActiveYear(null);

        // Update the active career
        setActiveCareer(null);
      }
    }

    // ! -----> Career deletion failed
    else {
      console.error("[handleDeleteCareer] Error:", result.message);
      setErrors({ career: result.message });
    }
  } catch (error) {
    console.error("[handleDeleteCareer] Error:", error);
    setErrors({ career: "An error occurred while deleting the career" });
  }
};

export default handleDeleteCareer;
