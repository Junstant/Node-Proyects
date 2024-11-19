import ResponseBuilderModules from "./builders/responseBuilderModules.builder.js";

//% ---------- Esquema de validación para cada campo ------>

const validationSchema = {
  //^ ----> Validación de nombre
  name: {
    required: true,
    type: "string",
    minLength: 1,
    errorMsg: "Name is required and must be a non-empty string",
  },

  //^ ----> Validación de horario
  schedule: {
    type: "object",
    customValidator: (schedule, resHelp) => {
      if (!Array.isArray(schedule)) {
        resHelp("schedule", "Schedule must be of type arrays");
        return;
      }
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

  //^ ----> Validación de ubicación
  location: {
    required: true,
    errorMsg: "Location is required",
  },

  //^ ----> Validación de profesor
  professor: {
    required: true,
    errorMsg: "Proffesor is required",
  },

  //^ ----> Validación de dependencias
  dependencies: {
    type: "array",
    customValidator: (dependencies, resHelp) => {
      dependencies.forEach((dep, index) => {
        if (!dep) resHelp("dependencies", `Dependency at index ${index} is required`);
      });
    },
  },

  //^ ----> Validación de estado
  state: {
    type: "string",
    required: true,
    validValues: ["In Progress", "Approved", "Failed", "Pending"],
    errorMsg: "State must be one of the valid states",
  },

  //^ ----> Validación de ausencias
  absents: {
    type: "object",
    customValidator: (absent, resHelp) => {
      absent.forEach((absent, index) => {
        if (!absent.date || isNaN(new Date(absent.date).getTime())) {
          resHelp("absents", `Invalid or missing date at index ${index}`);
        }
        if (!absent.reason || typeof absent.reason !== "string" || absent.reason.trim().length === 0) {
          resHelp("absents", `Invalid or missing reason at index ${index}`);
        }
        if (absent.absenceNumber === undefined || typeof absent.absenceNumber !== "number") {
          resHelp("absents", `Invalid or missing absenceNumber at index ${index}`);
        }
    });
    },
  },

  //^ ----> Validación de periodo
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

  //^ ----> Validación de notas
  notes: {
    type: "object",
    customValidator: (notes, resHelp) => {
      notes.forEach((note, index) => {
        if (!note.title || typeof note.title !== "string" || note.title.trim().length === 0) {
          resHelp("notes", `Invalid or missing title at index ${index}`);
        }
        if (note.calification === undefined || typeof note.calification !== "number" || note.calification < 0 || note.calification > 10) {
          resHelp("notes", `Invalid or missing calification at index ${index}. Must be a number between 0 and 10.`);
        }
      });
    },
  },

  //^ ----> Validación de tareas
  homeworks: {
    type: "object",
    customValidator: (homeworks, resHelp) => {
      homeworks.forEach((homework, index) => {
        if (!homework.title || typeof homework.title !== "string" || homework.title.trim().length === 0) {
          resHelp("homeworks", `Invalid or missing title at index ${index}`);
        }
        if (!homework.deliveryDate || isNaN(new Date(homework.deliveryDate).getTime())) {
          resHelp("homeworks", `Invalid or missing deliveryDate at index ${index}`);
        }
        if (!homework.description || typeof homework.description !== "string" || homework.description.trim().length === 0) {
          resHelp("homeworks", `Invalid or missing description at index ${index}`);
        }
        if (homework.completed === undefined || typeof homework.completed !== "boolean") {
          resHelp("homeworks", `Invalid or missing completed flag at index ${index}`);
        }
        if (homework.calification === undefined || typeof homework.calification !== "number" || homework.calification < 0 || homework.calification > 10) {
          resHelp("homeworks", `Invalid or missing calification at index ${index}. Must be a number between 0 and 10.`);
        }
        if (!Array.isArray(homework.remember)) {
          resHelp("homeworks", `Invalid or missing remember array at index ${index}`);
        } else {
          homework.remember.forEach((reminder, remIndex) => {
            if (!reminder.description || typeof reminder.description !== "string" || reminder.description.trim().length === 0) {
              resHelp("homeworks", `Invalid or missing reminder description at index ${index}, reminder ${remIndex}`);
            }
            if (reminder.completed === undefined || typeof reminder.completed !== "boolean") {
              resHelp("homeworks", `Invalid or missing reminder completed flag at index ${index}, reminder ${remIndex}`);
            }
          });
        }
      });
    },
  },


  //^ ----> Validación de año
  year: {
    type: "number",
    required: true,
    errorMsg: "Year is required and must be a number",
  },
};

//% ---------- Función de ayuda para agregar errores ------>

const resHelp = (response, field, message) => {
  if (!response.response.fieldErrors[field]) {
    response.response.fieldErrors[field] = { messages: [] };
  }
  response.response.fieldErrors[field].messages.push(message);
  response.setOk(false);
  response.setStatus(400);
  response.setPayload({
    message: "Module not created",
  });
};

//% ---------- Función principal de validación ------------>

const modulesValidations = (fields = {}) => {
  const response = new ResponseBuilderModules();
  response.setOk(true);
  response.response.fieldErrors = {}; // Inicializar errores

  for (const field in fields) {
    // Validar solo los campos presentes en 'fields'
    const rules = validationSchema[field];
    const value = fields[field];

    if (!rules) {
      continue; // Si el campo no tiene reglas definidas, saltar
    }

    if (rules.required && (value === undefined || value === null || value === "")) {
      resHelp(response, field, rules.errorMsg || `${field} is required`);
      continue;
    }

    if (rules.type && typeof value !== rules.type) {
      resHelp(response, field, `${field} must be of type ${rules.type}`);
      continue;
    }

    if (rules.validValues && !rules.validValues.includes(value)) {
      resHelp(response, field, `${field} must be one of ${rules.validValues.join(", ")}`);
      continue;
    }

    if (rules.minLength && value.length < rules.minLength) {
      resHelp(response, field, rules.errorMsg || `${field} must be at least ${rules.minLength} characters long`);
      continue;
    }

    if (rules.customValidator) {
      rules.customValidator(value, (field, message) => resHelp(response, field, message));
    }
  }

  if (Object.keys(response.response.fieldErrors).length > 0) {
    response.setOk(false);
    response.setStatus(400);
    response.setPayload({ message: "Module not created" });
    return response;
  }

  response.setOk(true);
  response.setStatus(200);
  response.setPayload({ message: "Module created successfully" });

  return response;
};

export default modulesValidations;
