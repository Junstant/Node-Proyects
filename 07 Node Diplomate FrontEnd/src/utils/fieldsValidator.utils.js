// ^ --------------------------- validatorUtils.js ------------>
// validation of required fields
export const isRequired = (value) => {
    return value ? null : "This field is required.";
  };
  
  // Validation of minimum length
  export const minLength = (value, length) => {
    return value && value.length >= length
      ? null
      : `It has to be at least ${length} characters length.`;
  };
  
  // Validation of email
  export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Invalid email address.";
  };
  
  // Validation of number
  export const isNumber = (value) => {
    return !isNaN(value) ? null : "It has to be a number.";
  };
  
  // Validation of strong password
  export const isStrongPassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value)
      ? null
      : "At least 8 char, one letter, one number and one special character.";
  };
  
  // Error message for the field
  export const validateField = (value, rules) => {
    for (let rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
  