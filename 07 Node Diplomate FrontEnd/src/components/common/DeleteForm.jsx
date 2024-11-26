import React, { useState } from "react";
import { FormControl, Input, InputAdornment, InputLabel, FormHelperText, Button, IconButton, Modal } from "@mui/material";
import { Eye, EyeClosed, Trash } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import handleSubmitDelete from "../../Screens/UserPanel/deleteUser";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";

// ? ------------------ DeleteForm Logic ------->
const DeleteForm = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // # -> Function to switch the modal visibility
  const [open, setOpen] = useState(false);

  // # -> States to manage form values
  const [valuesDelete, setValuesDelete] = useState({ deletePassword: "" });
  
  // # -> States to manage form errors
  const [errorsDelete, setErrorsDelete] = useState({});

  // # -> Custom hooks to manage changes and password visibility
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();
  
  // # -> Function to handle changes
  const handleChangeDelete = createHandleChange(setValuesDelete);

  // ? ------------------ DeleteForm Component ------->
  return (
    <>
      <Button variant="contained" startIcon={<Trash />} onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <form onSubmit={(e) => handleSubmitDelete(e, valuesDelete, setErrorsDelete, user, navigate)}>
            <h2>Please enter your password to delete your account</h2>
            <FormControl>
              <InputLabel htmlFor="delete-password">Password:</InputLabel>
              <Input
                id="delete-password"
                name="deletePassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={valuesDelete.deletePassword}
                onChange={handleChangeDelete}
                required
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errorsDelete.password && <label className="error">{errorsDelete.password}</label>}</FormHelperText>
            </FormControl>
            {errorsDelete.general && <p className="error general">{errorsDelete.general}</p>}
            <Button type="submit" variant="contained" startIcon={<Trash />}>
              Delete
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DeleteForm;
