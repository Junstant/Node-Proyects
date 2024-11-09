/**
 * Fetches data from the backend using the specified URL, method, and body.
 *
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method to use for the request (e.g., "GET", "POST").
 * @param {Object} body - The body of the request, which will be stringified to JSON.
 * @returns {Promise<Object>} - A promise that resolves to the response data if the request is successful.
 * @throws {Error} - Throws an error if the response is not ok or if an error occurs during the fetch.
 *
 * @example
 * const url = "https://api.example.com/data";
 * const method = "POST";
 * const body = { key: "value" };
 * 
 * backFetch(url, method, body)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */

//? --------> Function to fetch data from the backend
const backFetch = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // * -----> if the response is ok, return the data
    if (response.ok) {
      return { success: true, data };
    } 
    // ! -----> If the response is not ok, return the error
    else {
      return { success: false, error: data };
    }
  } 
  catch (error) {
    // ! -----> Catch network or parsing errors
    return { success: false, error: error.message || "Network error" };
  }
};

export default backFetch;