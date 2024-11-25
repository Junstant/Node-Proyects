import React, { useState } from "react";
import { Alert } from "@mui/material";

// ? ------------------ SmoothAlert Component ------->
const SmoothAlert = ({ message, severity = "error", onCloseComplete }) => {
  const [open, setOpen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // # ---> Function to close the alert
  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setOpen(false);
      if (onCloseComplete) onCloseComplete();
    }, 300);
  };

  if (!open) return null;

  // ? ------------------ SmoothAlert Component ------->
  return (
    <div
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </div>
  );
};

export default SmoothAlert;
