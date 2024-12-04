import { createTheme } from "@mui/material/styles";

const themeNew = createTheme({
  palette: {
    primary: {
      main: "#43AFFF", // Main color
      contrastText: "#FFFFFF", // Text color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#3F4767", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#43A4FF", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#43A4FF", // Border color on focus
            },
            "&.Mui-error fieldset": {
              borderColor: "#ff5959", // Border color on error
            },
            "& .MuiInputAdornment-root": {
              color: "#6D7AAD", // Icon color
            },
          },
          "& .MuiInputLabel-root": {
            color: "#6D7AAD", // Label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6D7AAD", // Label color on focus
          },
          "& .MuiInputLabel-root.Mui-error": {
            color: "#ff5959", // Label color on error
          },
          "& .MuiInputBase-input": {
            color: "white", // Input text color
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Texto blanco en botones por defecto
          },
        },
      },
    },
  },
});

export default themeNew;
