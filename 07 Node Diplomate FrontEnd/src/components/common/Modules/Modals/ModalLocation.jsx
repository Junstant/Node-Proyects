import React, {useState} from "react";
import { Button, FormHelperText, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { NotePencil, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";

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
      // # -> Update the module
      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid location." });
    }
  };
  // ? ------------------ ModalLocation Component ------->
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit module location</DialogTitle>
      <DialogContent>
        <TextField name="location" label="Location" variant="outlined" fullWidth margin="normal" value={location.location} onChange={handleChange} />
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

export default ModalLocation;
