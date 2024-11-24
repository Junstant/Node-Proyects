// ^ --------------------------- validatorUtils.js ------------>
// Validación de campos requeridos
export const isRequired = (value) => {
    return value ? null : "This field is required.";
  };
  
  // Validación de longitud mínima
  export const minLength = (value, length) => {
    return value && value.length >= length
      ? null
      : `It has to be at least ${length} characters length.`;
  };
  
  // Validación de correo electrónico
  export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Invalid email address.";
  };
  
  // Validación numérica
  export const isNumber = (value) => {
    return !isNaN(value) ? null : "It has to be a number.";
  };
  
  // Validación de contraseña (ejemplo)
  export const isStrongPassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value)
      ? null
      : "At least 8 char, one letter, one number and one special character.";
  };
  
  // Validación genérica para múltiples reglas
  export const validateField = (value, rules) => {
    for (let rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
  