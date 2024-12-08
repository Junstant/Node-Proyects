import React, { useState } from "react";
import { FormControl, InputAdornment, FormHelperText, Button, IconButton, TextField } from "@mui/material";
import { Eye, EyeClosed, Info } from "@phosphor-icons/react";
import usePasswordVisibility from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import handleSubmitUpdate from "../../Screens/UserPanel/updateUser";
import useUserStore from "../../stores/userStore";
import "../../assets/styles/global.css";
import themeNew from "../../assets/styles/theme.jsx";
import { ThemeProvider } from "@mui/material/styles";

// ? ------------------ UpdateForm Logic ------->
const UpdateForm = () => {
  const { user } = useUserStore();

  // # -> States to manage form values
  const [valuesUpdate, setValuesUpdate] = useState({ name: user.name, email: user.email, oldPassword: "", newPassword: "" });

  // # -> States to manage form errors
  const [errorsUpdate, setErrorsUpdate] = useState({});

  // # -> Custom hooks to manage password visibility
  const { showPassword, togglePasswordVisibility, handleMouseDown, handleMouseUp } = usePasswordVisibility();
  const handleChangeUpdate = createHandleChange(setValuesUpdate);

  // ? ------------------ UpdateForm Component ------->
  return (
    <form className="w-full flex flex-col gap-6" onSubmit={(e) => handleSubmitUpdate(e, valuesUpdate, setErrorsUpdate, user)}>
      <ThemeProvider theme={themeNew}>
        {/* Name */}
        <div className="w-full">
          <FormControl variant="standard" className="w-full">
            <TextField label="Name:" id="update-name" name="name" type="text" placeholder="John" value={valuesUpdate.name} onChange={handleChangeUpdate} required autoComplete="name" />
            <FormHelperText>{errorsUpdate.name && <label className="text-red-500">{errorsUpdate.name}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* Email */}
        <div className="w-full">
          <FormControl variant="standard" className="w-full" disabled>
            <TextField label="Email:" id="update-email" name="email" type="email" value={valuesUpdate.email} disabled autoComplete="email" />
          </FormControl>
        </div>

        {/* Actual password */}
        <div className="w-full">
          <FormControl variant="standard" className="w-full">
            <TextField
              error={errorsUpdate.oldPassword ? true : false}
              label="Actual Password:"
              id="update-old-password"
              name="oldPassword"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Old password"
              value={valuesUpdate.oldPassword}
              onChange={handleChangeUpdate}
              required
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
            <FormHelperText>{errorsUpdate.oldPassword && <label className="text-red-500">{errorsUpdate.oldPassword}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* New password */}
        <div className="w-full">
          <FormControl variant="standard" className="w-full">
            <TextField
              error={errorsUpdate.newPassword ? true : false}
              label="New Password:"
              id="update-new-password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={valuesUpdate.newPassword}
              onChange={handleChangeUpdate}
              required
              autoComplete="new-password"
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
            <FormHelperText>{errorsUpdate.newPassword && <label className="text-red-500">{errorsUpdate.newPassword}</label>}</FormHelperText>
          </FormControl>
        </div>

        {/* Update button */}
        <Button type="submit" sx={{ padding: 2, paddingX:8 }} className="btn-outlined-custom w-fit px-8" variant="contained" startIcon={<Info />}>
          Update
        </Button>
        {errorsUpdate.general && <p className="errorBadge">{errorsUpdate.general}</p>}
      </ThemeProvider>
    </form>
  );
};

export default UpdateForm;
