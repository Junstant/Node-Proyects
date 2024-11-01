import extractFormData from "../../utils/formExtactor.utils";

// :: --------> Function to handle the form submission
const handleSubmitLogin = async (e) => {
  e.preventDefault();

  // Extract form data
  const formValues = new FormData(e.target);
  const defaultFields = {
    email: "", 
    password: "" 
};
  // Extract form data
  const formObject = extractFormData(defaultFields, formValues);

  try {
    // Send form data to the server for registration
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });


    // * -----> If the response is ok, log the data
    if (response.ok) {
      const data = await response.json();
      console.log("User logged in sucesfully:", data);
    } 
    
    // ! -----> If the response is not ok, log the error
    else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
    }
  } 
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("An error occurred:", error);
  }
};

export default handleSubmitLogin;
