import ResponseBuilderModules from "./builders/responseBuilderModules.builder.js";

//% ---------- Esquema de validación para cada campo ------>

const validationSchema = {
  //^ ----> Validación de nombre
  name: {
    required: false,
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
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
    required: false,
    errorMsg: "Location is required",
  },

  //^ ----> Validación de profesor
  professor: {
    required: false,
    errorMsg: "Professor is required",
  },

  //^ ----> Validación de dependencias
  dependencies: {
    required: false,
    type: "object",
    customValidator: (dependencies, resHelp) => {
      dependencies.forEach((dep, index) => {
        if (!dep) resHelp("dependencies", `Dependency at index ${index} is required`);
      });
    },
  },

  //^ ----> Validación de estado
  state: {
    type: "string",
    required: false,
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
    required: false,
    type: "object",
    customValidator: (period, resHelp) => {
      const validYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year", "Seventh Year", "Eighth Year", "Ninth Year", "Tenth Year"];
      if (!validYears.includes(period.year)) {
        resHelp("period", "Year must be a valid option");
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

  //^ ----> Validación de color
  color: {
    required: false,
    type: "string",
    errorMsg: "Color must be a valid hexadecimal color code",
    customValidator: (color, resHelp) => {
      const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexColorPattern.test(color)) {
        resHelp("color", "Invalid color format. Must be a valid hexadecimal code (e.g., #FFF or #123456)");
      }
    },
  },


  //^ ----> Validación de año tiene que ser un número entre 1 y 20
  year: {
    type: "number",
    required: true,
    errorMsg: "Year is required and must be a number",
    customValidator: (year, resHelp) => {
      if (year < 1 || year > 20) {
        resHelp("year", "Year must be a number between 1 and 20");
      }
    },
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

  for (const field in validationSchema) {
    const rules = validationSchema[field];
    const value = fields[field];

    // Si el campo no está en 'fields' o es undefined, no se valida
    if (value === undefined || value === null) {
      continue;
    }

    // Si el campo está presente, entonces validamos con las reglas
    if (rules.required && (value === "" || value === undefined || value === null)) {
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
