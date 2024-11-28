import React, { useState } from "react";
import { Button, FormHelperText, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { NotePencil, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";

// ? ------------------ ModulePanel Logic ------->
const ModalName = ({ open, handleClose }) => {
  //# -> Get the active module and year
  const { modules, activeModule, setModules, setActiveModule} = useUserStore();

  //# -> Name state
  const [name, setName] = useState({ name: activeModule.name || "" });

  //# -> Error states
  const [errorsModule, setErrorsModule] = useState({});

  //# -> Handle change
  const handleChange = createHandleChange(setName);

  // ^ -----> Edit module
  const handleEditModule = async () => {
    if (name.name.trim()) {
      // # -> Create the new module object
      const newInfoModule = { name: name.name.trim() };
      // # -> Update the module
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid module name." });
    }
  };

  // ? ------------------ ModulePanel Component ------->
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit module name</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name.name}
          onChange={handleChange}
        />
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

export default ModalName;
