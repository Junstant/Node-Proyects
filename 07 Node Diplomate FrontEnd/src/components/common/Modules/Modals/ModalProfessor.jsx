import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Check, X } from "@phosphor-icons/react";
import createHandleChange from "../../../../hooks/formHandlers";
import useUserStore from "../../../../stores/userStore";
import handleUpdateModule from "../updateModule";
import "../../../../assets/styles/global.css";
import themeNew from "../../../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

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

      if (professor.professor.trim().length > 40) {
        setErrorsModule({ edit: "Professor name must be less than 40 characters." });
        return;
      }

      await handleUpdateModule(setModules, setErrorsModule, setActiveModule, modules, activeModule, newInfoModule);
      handleClose();
    } else {
      setErrorsModule({ edit: "Please provide a valid professor." });
    }
  };

  // ? ------------------ ModalProfessor Component ------->
  return (
    <ThemeProvider theme={themeNew}>
      <Dialog PaperProps={{ className: "modalPaperStyleOne" }} open={open} onClose={handleClose} className="backdrop-blur-sm">
        <DialogTitle className="text-white">Edit module professor</DialogTitle>
        <DialogContent>
          <TextField
            name="professor"
            label="Professor"
            variant="outlined"
            fullWidth
            margin="normal"
            value={professor.professor}
            onChange={handleChange}
            error={errorsModule.edit ? true : false}
            helperText={errorsModule.edit}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#ff43c0" }} className="btn-custom-denied" startIcon={<X />} onClick={handleClose}>
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

export default ModalProfessor;
