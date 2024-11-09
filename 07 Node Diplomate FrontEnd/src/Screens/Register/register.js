// :: --------> Function to handle the form submission
const handleSubmitRegister = async (e, values) => {
  e.preventDefault();

  try {
    // Send form data to the server for registration
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // * -----> If the response is ok, log the data
    if (response.ok) {
      const data = await response.json();
      console.log("User registered successfully:", data);
    } 
    
    // ! -----> If the response is not ok, log the error
    else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
    }
  } 
  // ! -----> If an error occurred, log the error
  catch (error) {
    console.error("An error occurred:", error);
  }
};

export default handleSubmitRegister;
