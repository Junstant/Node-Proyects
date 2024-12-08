import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Check, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@emotion/react";

// ? ------------------ Modal Location Logic ------->
const ModalLocation = ({ open, handleClose }) => {
  //# -> Get the active module and year
  const { modules, activeModule, setModules, setActiveModule } = useUserStore();

  //# -> Location state
  const [location, setLocation] = useState({ location: activeModule.location || "" });

  //# -> Error states
  const [errorsModule, setErrorsModule] = useState({});

  //# -> Handle change
  const handleChange = createHandleChange(setLocation);

  // ^ -----> Edit module
  const handleEditModule = async () => {
    if (location.location.trim()) {
      // # -> Create the new module object
      const newInfoModule = { location: location.location.trim() };

      // # -> if the location is greater than 40 characters then show error
      if (location.location.trim().length > 40) {
        setErrorsModule({ edit: "Module location must be less than 40 characters." });
        return;
      }

      // # -> Update the module
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid location." });
    }
  };
  // ? ------------------ ModalLocation Component ------->
  return (
    <ThemeProvider theme={themeNew}>
      <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={open} onClose={handleClose} className="backdrop-blur-sm">
        <DialogTitle className="text-white">Edit module location</DialogTitle>
        <DialogContent>
          <TextField name="location" label="Location" variant="outlined" fullWidth margin="normal" value={location.location} onChange={handleChange} error={errorsModule.edit ? true : false} helperText={errorsModule.edit}/>
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

export default ModalLocation;
