import { useState } from "react";

// Custom hook para manejar formularios
const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  // Maneja el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange };
};

export default useForm;
