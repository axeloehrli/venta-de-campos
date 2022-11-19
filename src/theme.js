import createTheme from '@mui/material/styles/createTheme';
import red from '@mui/material/colors/red';

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      main: "#ffffff"
    },
    primary: {
      main: "#51a331",
    },
    secondary: {
      main: '#8331a3',
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
