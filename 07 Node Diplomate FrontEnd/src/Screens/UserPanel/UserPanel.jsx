import React from "react";
import useUserStore from "../../stores/userStore";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/layouts/AppHeader";
import {Avatar, Button, Alert, FormControl, Checkbox,FormHelperText, Input, InputAdornment, InputLabel} from "@mui/material"; 
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { usePasswordVisibility } from "../../hooks/passwordSwitch";
import createHandleChange from "../../hooks/formHandlers";
import {Info} from "@phosphor-icons/react/dist/ssr";

// ? ------------------ UserPanel Logic ------->
const UserPanel = () => {
  const { user } = useUserStore();

  // # -> Location hook
  const location = useLocation();
  const alertMessage = location.state?.alertMessage || "";

  // ? ------------------ UserPanel Component ------->
  return (
    <div>
      <AppHeader />
      {/* Alert */}
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
      <div>
        {/* Left panel */}
        <div>
          {/* Top panel */}
          <div>
            <Avatar src="https://avatar.iran.liara.run/public/41"/>
            <h1>{user.name}</h1>
          </div>
          {/* Down panel */}
          <div>
            <h3>My personal information</h3>
            //form with name, lastname, email, old password, new password, update button, deleteaccount with a checkbox with an acceptance
            <form onSubmit={(e) => handleSubmitUpdate(e, valuesUpdate, setErrorsUpdate, user, setUser, setUserTokenFunc)}>
              {/* Name */}
              <div>
                <FormControl variant="standard">
                  <InputLabel htmlFor="update-name">Name:</InputLabel>
                  <Input id="update-name" name="name" type="text" placeholder="John" value={valuesUpdate.name} onChange={handleChangeUpdate} required autoComplete="name"/>
                  <FormHelperText>{errorsUpdate.name && <label className="error">{errorsUpdate.name}</label>}</FormHelperText>
                </FormControl>
              </div>
              {/* Lastname */}
              <div>
                <FormControl variant="standard">
                  <InputLabel htmlFor="update-lastname">Lastname:</InputLabel>
                  <Input id="update-lastname" name="lastname" type="text" placeholder="Doe" value={valuesUpdate.lastname} onChange={handleChangeUpdate} required autoComplete="lastname"/>
                  <FormHelperText>{errorsUpdate.lastname && <label className="error">{errorsUpdate.lastname}</label>}</FormHelperText>
                </FormControl>
              </div>
              {/* Email */}
              <div>
                <FormControl variant="standard">
                  <InputLabel htmlFor="update-email">Email:</InputLabel>
                  <Input id="update-email" name="email" type="email" placeholder="example@gmail.com" value={valuesUpdate.email} onChange={handleChangeUpdate} required autoComplete="email"/>
                  <FormHelperText>{errorsUpdate.email && <label className="error">{errorsUpdate.email}</label>}</FormHelperText>
                </FormControl>
          </div>
          {/* Password */}
          <FormControl variant="standard">
            <InputLabel htmlFor="update-old-password">Old Password:</InputLabel>
            <Input
              id="update-old-password"
              name="oldPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Old password"
              value={valuesUpdate.oldPassword}
              onChange={handleChangeUpdate}
              required
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errorsUpdate.oldPassword && <label className="error">{errorsUpdate.oldPassword}</label>}</FormHelperText>
          </FormControl>

          {/* New Password */}
          <FormControl variant="standard">
            <InputLabel htmlFor="update-new-password">New Password:</InputLabel>
            <Input
              id="update-new-password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={valuesUpdate.newPassword}
              onChange={handleChangeUpdate}
              required
              autoComplete="new-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errorsUpdate.newPassword && <label className="error">{errorsUpdate.newPassword}</label>}</FormHelperText>
          </FormControl>    
          {/* Update button */}
          <Button type="submit" variant="contained" endIcon={<Info />}>
            Update
          </Button>
          {errorsUpdate.general && <p className="error general">{errorsUpdate.general}</p>}
        </form>
        </div>

        </div>
        {/* Right panel */}
        <div></div>
      </div>
    </div>
  );
};

export default UserPanel;
