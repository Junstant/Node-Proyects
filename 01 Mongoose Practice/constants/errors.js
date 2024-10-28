const ErrorsDB = {
    11000: {
      message: "Email already exists!",
      code: 400,
      name: "DUPLICATED_EMAIL",
      action: (from, details) => {
        console.log(`Error: ${from} - ${details}`);
      },
    },
    400: {
      message: "Bad request!",
      code: 400,
      name: "BAD_REQUEST",
      action: (from, details) => {
        console.log(`Error: ${from} - ${details}`);
      },
    },
    500: {
      message: "Internal server error!",
      code: 500,
      name: "INTERNAL_SERVER_ERROR",
      action: (from, details) => {
        console.log(`Error: ${from} - ${details}`);
      },
    },
    404: {
      message: "Not found!",
      code: 404,
      name: "NOT_FOUND",
      action: (from, details) => {
        console.log(`Error: ${from} - ${details}`);
      },
    },
  };
  
export { ErrorsDB };  