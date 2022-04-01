import { responsiveFontSizes } from '@mui/material'
import { amber, common, blue, red } from '@mui/material/colors'
import { createTheme, adaptV4Theme } from '@mui/material/styles';

let customTheme = createTheme(adaptV4Theme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    primary: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
      contrastText: common.white,
    },
    secondary: {
      light: amber['A100'],
      main: amber['A400'],
      dark: amber['A700'],
      contrastText: common.black,
    },
    error: {
      light: red[500],
      main: red[700],
      dark: red[900],
      contrastText: common.white,
    },
  },
}))
customTheme = responsiveFontSizes(customTheme)

export default customTheme
