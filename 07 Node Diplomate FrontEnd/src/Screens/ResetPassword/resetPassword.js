import extractFormData from "../../utils/formExtactor.utils";

// :: --------> Function to handle the form submission
const handleSubmitResetPassword = async (e, token) => {
  e.preventDefault();

  // Extract form data
  const formValues = new FormData(e.target);
  const defaultFields = {
    password: "",
    confirmPassword: "",
  };

  // Extract form data
  const formObject = extractFormData(defaultFields, formValues);

  //Validate the password and confirm password fields are the same
  console.log(formObject.password, formObject.confirmPassword);
  if (formObject.password !== formObject.confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  try {
    // Send form data to the server for registration
    console.log("http://localhost:3000/api/auth/reset-password/" + token);
    const response = await fetch("http://localhost:3000/api/auth/reset-password/" + token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });

    // * -----> If the response is ok, log the data
    if (response.ok) {
      const data = await response.json();
      console.log("Password reseted sucesfully:", data);
    }

    // ! -----> If the response is not ok, log the error
    else {
      const errorData = await response.json();
      console.error("Password reseted failed:", errorData);
    }
  } catch (error) {
    // ! -----> If an error occurred, log the error
    console.error("An error occurred:", error);
  }
};

export default handleSubmitResetPassword;
