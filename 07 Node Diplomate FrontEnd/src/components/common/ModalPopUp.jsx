import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import "../../assets/styles/global.css";
import themeNew from "../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { X, Check } from "@phosphor-icons/react";

// ? ------------------ ModalPopUp Component ------->
const ModalPopUp = ({ open, handleClose, title, children, onSubmit, submitLabel = "Save", cancelLabel = "Cancel", cancelIcon, submitIcon }) => {
  return (
    <>
      <ThemeProvider theme={themeNew}>
        <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={open} onClose={handleClose}>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button sx={{gap:1, color:"#ff43c0"}} className="btn-custom-denied" startIcon={cancelIcon} onClick={handleClose}>
              <X />
              {cancelLabel}
            </Button>
            <Button sx={{gap:1}} className="btn-custom-accept" startIcon={submitIcon} onClick={onSubmit}>
              <Check />
              {submitLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default ModalPopUp;
