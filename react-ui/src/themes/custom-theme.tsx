import { responsiveFontSizes } from '@mui/material'
import { lightBlue, common, indigo, red } from '@mui/material/colors'
import { ptBR as ptBRCore } from '@mui/material/locale'
import { createTheme, Theme } from '@mui/material/styles'

const createCustomTheme = function (
  defaultInputVariant:
    | 'filled'
    | 'outlined'
    | 'standard'
    | undefined = 'filled',
  defaultButtonVariant:
    | 'text'
    | 'outlined'
    | 'contained'
    | undefined = 'contained'
): Theme {
  const theme = createTheme(
    {
      components: {
        MuiTextField: {
          defaultProps: {
            variant: `${defaultInputVariant}`,
          },
        },
        MuiFormControl: {
          defaultProps: {
            variant: `${defaultInputVariant}`,
          },
        },
        MuiButton: {
          defaultProps: {
            variant: `${defaultButtonVariant}`,
          },
        },
      },
      typography: {
        fontFamily: 'Roboto',
      },
      palette: {
        primary: {
          light: indigo[300],
          main: indigo[500],
          dark: indigo[900],
          contrastText: common.white,
        },
        secondary: {
          light: lightBlue[900],
          main: lightBlue['A100'],
          dark: lightBlue['A700'],
          contrastText: common.black,
        },
        error: {
          light: red[500],
          main: red[700],
          dark: red[900],
          contrastText: common.white,
        },
      },
    },
    ptBRCore
  )
  return responsiveFontSizes(theme)
}

const customTheme = createCustomTheme()

let otherTheme = createTheme(customTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'text',
      },
    },
  },
})
otherTheme = responsiveFontSizes(otherTheme)

export default customTheme
export { otherTheme, createCustomTheme }
