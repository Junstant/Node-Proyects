import backFetch from "../../../utils/fetchHTTP.utils";
import customResponse from "../../../utils/responseBuilder.utils";
import ENVIROMENT from "../../../config/enviroment.config";
import { isRequired } from "../../../utils/fieldsValidator.utils";

//^ --------> Function to handle the deletion of a career
const handleDeleteCareer = async (setCareers, setErrors, careerId, user, oldCareers) => {
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
      url: `${ENVIROMENT.BACK_DIR}/api/career/delete`,
      method: "PUT",
      headers: { "x-api-key": ENVIROMENT.API_INTERNAL, Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
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
    }

    // ! -----> Career deletion failed
    else {
      setErrors({ career: result.message });
    }
  } catch (error) {
    console.error("[handleDeleteCareer] Error:", error);
    setErrors({ career: "An error occurred while deleting the career" });
  }
};

export default handleDeleteCareer;
