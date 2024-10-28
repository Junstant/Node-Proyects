import React from "react";
import { Link } from "react-router-dom";

const extractFormData = (formFields, formValues) => {
  for (let fields in formFields) {
    formFields[fields] = formValues.get(fields);
  }
  return formFields;
};

//* ---------------> Register Component <---------------
const Register = () => {
  // Function to handle the form submission
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const formData = e.target;
    const formValues = new FormData(formData);
    //Default values of form fields
    const formFields = {
      name: "",
      email: "",
      password: "",
    };
    const formObject = extractFormData(formFields, formValues);
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Content-Type specifies the format of the data being sent
      },
      body: JSON.stringify(formObject),
    }).then(
      (responseHTTP) => {
      if (responseHTTP.ok) {
        console.log("User registered successfully");
        console.log(responseHTTP);
        responseHTTP
          .json()
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } 
      else {
        responseHTTP.json().then((data) => {
          console.log(data);
        });
      }
    }
  )
  .then(
    (body) => {
      console.log({body});
    }
  );
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmitRegister}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder="Name..." />
        </div>
        <div>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." />
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Click here</Link>
    </div>
  );
};

export default Register;
