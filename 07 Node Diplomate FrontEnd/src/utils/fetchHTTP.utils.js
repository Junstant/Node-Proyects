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

// ^ ------------ Function to fetch data from the backend ----------------->
const backFetch = async ({ url, method = "GET", body = null, headers = {}, queryParams = {} }) => {
  try {
    // Construct query string if queryParams is provided
    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // Configure fetch options
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Merge custom headers
      },
    };

    // Add body if method allows and body is provided
    if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      options.body = JSON.stringify(body);
    }

    // Make the fetch call
    const response = await fetch(fullUrl, options);

    // Parse JSON response
    const data = await response.json();

    // Handle response status
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data, status: response.status };
    }
  } catch (error) {
    // Handle network or other errors
    return { success: false, error: error.message || "Network error" };
  }
};

export default backFetch;