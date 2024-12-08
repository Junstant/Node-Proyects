//^ --------> Function to build a custom response
const customResponse = (response, successMessage, errorMessage) => {
  if (response.success) {
    console.log(successMessage + ":", response.data);
    return { success: true, data: response.data };
  } else {
    console.error(errorMessage + ":", response.error);
    return { success: false, error: response.error };
  }
};

export default customResponse;