import React, { useState } from "react";
import { FormControl, Input, InputAdornment, InputLabel, FormHelperText, Button, IconButton, Modal, TextField } from "@mui/material";
import { Eye, EyeClosed, Trash, X } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import handleSubmitDelete from "../../Screens/UserPanel/deleteUser";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import "../../assets/styles/global.css";
import themeNew from "../../assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

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
      <ThemeProvider theme={themeNew}>
        <Button variant="contained" sx={{ padding: 2 }} className="btn-outlined-custom" startIcon={<Trash />} onClick={() => setOpen(true)}>
          <p className="leading-none">Delete account</p>
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col justify-center items-center h-full backdrop-blur-sm">
            <form className="h-fit w-fit p-20 rounded-3xl border-strokeT bg-modalT flex flex-col items-center justify-center text-center border relative max-md:p-10" onSubmit={(e) => handleSubmitDelete(e, valuesDelete, setErrorsDelete, user, navigate)}>
                {/* Button to close the modal */}
                <IconButton onClick={() => setOpen(false)} variant="contained" className="w-fit" sx={{position:"absolute", top:"10px", right:"10px"}}>
                  <X/>
                </IconButton>
              <h2>Please enter your password to delete your account</h2>
              <p className="mb-9 mt-2 text-quaternary">This action is irreversible</p>
              <FormControl className="w-full">

                <TextField
                  error={errorsDelete.password ? true : false}
                  label="Password:"
                  id="delete-password"
                  name="deletePassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={valuesDelete.deletePassword}
                  onChange={handleChangeDelete}
                  required
                  autoComplete="current-password"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "hide the password" : "display the password"}
                            onClick={togglePasswordVisibility}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            edge="end"
                          >
                            {showPassword ? <Eye color="#3F4767" /> : <EyeClosed color="#3F4767" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <FormHelperText>{errorsDelete.password && <label className="error">{errorsDelete.password}</label>}</FormHelperText>
              </FormControl>
              {errorsDelete.password && <p className="errorBadge">{errorsDelete.password}</p>}
              <Button sx={{ padding: 2, marginTop:3 }} className="btn-outlined-custom w-full" type="submit" variant="contained" startIcon={<Trash />}>
                Delete
              </Button>
            </form>
          </div>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default DeleteForm;
