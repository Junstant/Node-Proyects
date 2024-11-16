import ResponseBuilderModules from "./builders/responseBuilderModules.builder.js";

//% ---------- Esquema de validación para cada campo ------>
const validationSchema = {
  //^ ---> Nombre
  name: {
    required: true,
    type: "string",
    minLength: 1,
    errorMsg: "Name is required and must be a non-empty string",
  },

  //^ ---> Horario
  schedule: {
    type: "array",
    customValidator: (schedule, resHelp) => {
      const validDays = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
      const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

      schedule.forEach((day, index) => {
        if (!day.name || !validDays.includes(day.name)) {
          resHelp("schedule", `Invalid or missing day name at index ${index}`);
        }
        if (!day.fromHr || !timePattern.test(day.fromHr)) {
          resHelp("schedule", `Invalid or missing fromHr at index ${index}`);
        }
        if (!day.toHr || !timePattern.test(day.toHr)) {
          resHelp("schedule", `Invalid or missing toHr at index ${index}`);
        }
      });
    },
  },

  //^ ---> Ubicación
  location: {
    required: true,
    errorMsg: "Location is required",
  },

  //^ ---> Profesor
  proffesor: {
    required: true,
    errorMsg: "Proffesor is required",
  },

  //^ ---> Dependencias
  dependencies: {
    type: "array",
    customValidator: (dependencies, resHelp) => {
      dependencies.forEach((dep, index) => {
        if (!dep) resHelp("dependencies", `Dependency at index ${index} is required`);
      });
    },
  },

  //^ ---> State
  state: {
    required: true,
    validValues: ["In Progress", "Approved", "Failed", "Pending"],
    errorMsg: "State must be one of the valid states",
  },

  //^ ---> Absents
  period: {
    type: "object",
    customValidator: (period, resHelp) => {
      if (typeof period.year !== "number") {
        resHelp("period", "Year must be a number");
      }
      const validSemesters = ["Bimonthly", "Quarterly", "Four-monthly", "Annual"];
      if (!validSemesters.includes(period.semester)) {
        resHelp("period", "Semester must be a valid option");
      }
    },
  },

  //^ ---> Year
  year: {
    type: "number",
    required: true,
    errorMsg: "Year is required and must be a number",
  },
};

//% ---------- Función de ayuda para agregar errores ------>
const resHelp = (response, field, message) => {
  // Inicializar fieldErrors[field] si no existe
  if (!response.response.fieldErrors[field]) {
    response.response.fieldErrors[field] = { messages: [] };
  }

  // Agregar el mensaje de error
  response.response.fieldErrors[field].messages.push(message);

  response.setOk(false); // Importante: mantener el estado como false al detectar un error
  response.setStatus(400);
  response.setPayload({
    message: "Module not created",
  });
};

// ? ---> Función principal de validación
const modulesValidations = (fields = {}) => {
  const response = new ResponseBuilderModules();
  response.setOk(true);

  // ? --->  Iterar sobre el esquema y validar cada campo
  for (const field in validationSchema) {
    const rules = validationSchema[field];
    const value = fields[field];

    // ? --->  Validar si es requerido y está ausente
    if (rules.required && (value === undefined || value === null || value === "")) {
      resHelp(response, field, rules.errorMsg || `${field} is required`);
      continue;
    }

    // ? ---> Validar el tipo
    if (rules.type && typeof value !== rules.type) {
      resHelp(response, field, `${field} must be of type ${rules.type}`);
      continue;
    }

    // ? ---> Validar valores permitidos
    if (rules.validValues && !rules.validValues.includes(value)) {
      resHelp(response, field, `${field} must be one of ${rules.validValues.join(", ")}`);
      continue;
    }

    // ? ---> Validación de longitud mínima
    if (rules.minLength && value.length < rules.minLength) {
      resHelp(response, field, rules.errorMsg || `${field} must be at least ${rules.minLength} characters long`);
      continue;
    }

    // ? --->  Ejecutar validador personalizado si existe
    if (rules.customValidator) {
      rules.customValidator(value, (field, message) => resHelp(response, field, message));
    }
  }

  // ? ---> Verificar si hubo errores
  if (response.response.fieldErrors.some((fieldError) => fieldError.messages.length > 0)) {
    return response;
  }

  // * ---> Si todo es correcto
  response.setOk(true);
  response.setStatus(200);
  response.setPayload({ message: "Module created successfully" });

  return response;
};

export default modulesValidations;
