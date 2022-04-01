# Jardel Novaes UI React Library
Library template for React frontend development.

### Material UI Themes
* CustomTheme (Default)

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
Exports all components at root and first subfolder level.

```ts
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/styles'

import { CustomButton, CustomTheme } from '@jardelnovaes/react-ui'

...
<ThemeProvider theme={ClamedTheme}>
  <CssBaseline />
  <CustomButton text={'My Button'} />
</ThemeProvider>
```

```ts
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/styles'

import { CustomButton } from '@jardelnovaes/react-ui/input'
import { CustomTheme } from '@jardelnovaes/react-ui/themes'

...
<ThemeProvider theme={ClamedTheme}>
  <CssBaseline />
  <CustomButton text={'My Button'} />
</ThemeProvider>
```