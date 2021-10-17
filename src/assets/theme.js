const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#000",
    },
  },
});

export default theme;
