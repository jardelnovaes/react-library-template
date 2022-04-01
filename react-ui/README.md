# Jardel Novaes UI React Library
Library template for React frontend development.

### Material UI Themes
* CustomTheme (Default)
* otherTheme (extends Default)

### Simple components

* CustomButton
```html
 <CustomButton
     text={'Click here'}
     color={'primary'}
     onClick={myFunction}
 />
```

### Composite Components
* Menu
* Navigation
* AuthProvider
* Login
* etc


### Info
Exports all components at root level

```ts
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/styles'

import { CustomButton, CustomTheme } from '@jardelnovaes/react-ui'

...
<ThemeProvider theme={CustomTheme}>
  <CssBaseline />
  <CustomButton text={'My Button'} />
</ThemeProvider>
```