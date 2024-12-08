import React, { useState } from "react";
import { Button, FormHelperText, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Check, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

// ? ------------------ Moodal Name Logic ------->
const ModalName = ({ open, handleClose }) => {
  //# -> Get the active module and year
  const { modules, activeModule, setModules, setActiveModule } = useUserStore();

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

      // # -> if the name is greater than 40 characters then show error
      if (name.name.trim().length > 40) {
        setErrorsModule({ edit: "Module name must be less than 40 characters." });
        return;
      }

      // # -> Update the module
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid module name." });
    }
  };

  // ? ------------------ ModulePanel Component ------->
  return (
    <ThemeProvider theme={themeNew}>
      <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={open} onClose={handleClose} className="backdrop-blur-sm">
        <DialogTitle className="text-white">Edit module name</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" variant="outlined" fullWidth margin="normal" value={name.name} onChange={handleChange} error={errorsModule.edit ? true : false} helperText={errorsModule.edit}/>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"#ff43c0"}} className="btn-custom-denied" startIcon={<X />} onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn-custom-accept" startIcon={<Check />} onClick={handleEditModule}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ModalName;
