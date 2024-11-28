import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

// ? ------------------ ModalPopUp Component ------->
const ModalPopUp = ({ open, handleClose, title, children, onSubmit, submitLabel = "Save", cancelLabel = "Cancel", cancelIcon, submitIcon }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button startIcon={cancelIcon} onClick={handleClose}>{cancelLabel}</Button>
        <Button startIcon={submitIcon} onClick={onSubmit}>{submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPopUp;
