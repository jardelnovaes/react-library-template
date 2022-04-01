import * as React from 'react'

import '@testing-library/jest-dom'
//TODO: Migrate to MUI v5
//import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import { render, screen } from '@testing-library/react'

import { CustomTheme } from '../../themes'
import { default as CustomButton } from './CustomButton'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


describe('CustomButton Tests', () => {
  const loadingQuery = 'CustomButton-buttonProgress'

  test('Check Disabled', () => {
    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={CustomTheme}>
          <CustomButton text="Custom-Button" color={'primary'} disabled={true} />
        </ThemeProvider>
      </StyledEngineProvider>
    )
    expect(screen.getByRole('button', { name: 'Custom-Button' })).toBeDisabled()
  })

  test('Check Loading', () => {
    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={CustomTheme}>
          <CustomButton text="Custom-Button" color={'primary'} loading={true} />
        </ThemeProvider>
      </StyledEngineProvider>
    )
    expect(screen.getByRole('button', { name: 'Custom-Button' })).toContainHTML(
      loadingQuery
    )
  })

  test('Check Default Behavior', () => {
    const mockedOnClick = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3))
    }

    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={CustomTheme}>
          <CustomButton
            text="Default-Behavior"
            color={'primary'}
            onClick={mockedOnClick}
          />
        </ThemeProvider>
      </StyledEngineProvider>
    )
    const button = screen.getByRole('button', { name: 'Default-Behavior' })

    expect(button).toBeEnabled()
    expect(button).not.toContainHTML(loadingQuery)

    button.click()

    expect(button).toBeDisabled()
    expect(button).toContainHTML(loadingQuery)
  })
})
