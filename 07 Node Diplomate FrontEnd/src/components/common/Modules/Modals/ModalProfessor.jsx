import React, { useState } from "react";
import { Button, FormHelperText, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { NotePencil, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";

// ? ------------------ Modal Professor Logic ------->
const ModalProfessor = ({ open, handleClose }) => {
  //# -> Get the active module and year
  const { modules, activeModule, setModules, setActiveModule } = useUserStore();

  //# -> Professor state
  const [professor, setProfessor] = useState({ professor: activeModule.professor || "" });

  //# -> Error states
  const [errorsModule, setErrorsModule] = useState({});

  //# -> Handle change
  const handleChange = createHandleChange(setProfessor);

  // ^ -----> Edit module
  const handleEditModule = async () => {
    if (professor.professor.trim()) {
      const newInfoModule = { professor: professor.professor.trim() };
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid professor." });
    }
  };

  // ? ------------------ ModalProfessor Component ------->
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit module professor</DialogTitle>
      <DialogContent>
        <TextField name="professor" label="Professor" variant="outlined" fullWidth margin="normal" value={professor.professor} onChange={handleChange} />
        {errorsModule.edit && <FormHelperText error>{errorsModule.edit}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button startIcon={<X />} onClick={handleClose}>
          Cancel
        </Button>
        <Button startIcon={<NotePencil />} onClick={handleEditModule}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalProfessor;
