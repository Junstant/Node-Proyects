import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const ModalPopUp = ({ open, handleClose, title, children, onSubmit, submitLabel = "Save", cancelLabel = "Cancel" }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelLabel}</Button>
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPopUp;
