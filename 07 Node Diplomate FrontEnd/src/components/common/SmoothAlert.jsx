import React, { useState } from "react";
import { Alert } from "@mui/material";
import "../../assets/styles/smoothAlert.css";
import "../../assets/styles/global.css";
import { Warning } from "@phosphor-icons/react";

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
      className="w-full flex justify-center positionAlert"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Alert className="alertMessage" severity={severity} onClose={handleClose} iconMapping={{ error: <Warning className="iconWarning" /> }}>
        {message}
      </Alert>
    </div>
  );
};

export default SmoothAlert;
