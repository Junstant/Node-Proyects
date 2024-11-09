/**
 * Builds a custom response based on the success status of the provided response object.
 *
 * @param {Object} response - The response object to be processed.
 * @param {string} successMessage - The message to log if the response is successful.
 * @param {string} errorMessage - The message to log if the response is not successful.
 * @returns {Object} - An object indicating success or failure, and containing the response data or error.
 *
 * @example
 * const response = { success: true, data: { id: 1, name: "John Doe" } };
 * const successMessage = "Operation successful!";
 * const errorMessage = "Operation failed!";
 * 
 * const result = customResponse(response, successMessage, errorMessage);
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error);
 * }
 */

//:: --------> Function to build a custom response
const customResponse = (response, successMessage, errorMessage) => {
  if (response.success) {
    console.log(successMessage);
    return { success: true, data: response.data };
  } else {
    console.error(errorMessage);
    return { success: false, error: response.error };
  }
};

export default customResponse;