import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#86870d',
    },
    secondary: {
      main: '#590700',
    },
    tertiary: {
      light: '#ffe7c5',
      main: '#d2b594',
      dark: '#a08566',
      contrastText: '#000000',
    },
  },
  shape: {
    borderRadius: 0,
  },
});
theme.palette.background.default = theme.palette.secondary.main;
console.log(theme);

export default theme;
