// formHandlers.js

/**
 * Handles changes for input fields in forms.
 * Updates the state dynamically based on input name and value.
 * 
 * @param {Function} setState - The state updater function for the form.
 * @returns {Function} - An event handler function for input changes.
 */
const createHandleChange = (setState) => (e) => {
  const { name, value } = e.target;
  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export default createHandleChange;
