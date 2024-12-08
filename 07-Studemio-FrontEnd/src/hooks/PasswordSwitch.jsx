import React, { useState } from 'react';

// Hook personalizado para manejar la visibilidad de la contraseña
const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
  };

  return {
    showPassword,
    togglePasswordVisibility,
    handleMouseDown,
    handleMouseUp,
  };
};

export default usePasswordVisibility;
