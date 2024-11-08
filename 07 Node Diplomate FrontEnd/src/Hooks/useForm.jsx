import { useState } from "react";

const useForm = (initialValues) => {
    // Set the initial values
  const [values, setValues] = useState(initialValues);
  
  // Handle the form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values,[name]: value,});
  }

  return {values, handleChange};
}

export default useForm;