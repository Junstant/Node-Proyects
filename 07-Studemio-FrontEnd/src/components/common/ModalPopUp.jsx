import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "../../assets/styles/global.css";
import themeNew from "../../assets/styles/Theme.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { X, Check } from "@phosphor-icons/react";

// ? ------------------ ModalPopUp Component ------->
const ModalPopUp = ({ open, handleClose, title, children, onSubmit, submitLabel = "Save", cancelLabel = "Cancel"}) => {
  return (
    <>
      <ThemeProvider theme={themeNew}>
        <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={open} onClose={handleClose} className="backdrop-blur-sm">
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button sx={{color:"#ff43c0"}} startIcon={<X/>} className="btn-custom-denied" onClick={handleClose}>
              {cancelLabel}
            </Button>
            <Button className="btn-custom-accept" startIcon={<Check/>} onClick={onSubmit}>  
              {submitLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default ModalPopUp;
