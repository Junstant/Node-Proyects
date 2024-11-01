/**
 * Extracts form data from a FormData object and maps it to the provided form fields.
 *
 * @param {Object} formFields - An object representing the default values of the form fields.
 * @param {FormData} formValues - A FormData object containing the form data to be extracted.
 * @returns {Object} - An object with the form fields populated with the corresponding values from the FormData object.
 *
 * @example
 * const formFields = { name: "", email: "", password: "" };
 * const formData = new FormData();
 * formData.append("name", "John Doe");
 * formData.append("email", "john.doe@example.com");
 * formData.append("password", "password123");
 * const result = extractFormData(formFields, formData);
 * console.log(result);
 *  Output: { name: "John Doe", email: "john.doe@example.com", password: "password123" }
 */
const extractFormData = (formFields, formValues) => {
    for (let fields in formFields) {
      formFields[fields] = formValues.get(fields);
    }
    return formFields;
};

export default extractFormData;