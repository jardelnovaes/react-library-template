import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'

import { CustomTheme } from '../../themes'
import { default as CustomButton } from './CustomButton'

describe('CustomButton Tests', () => {
  const loadingQuery = 'CustomButton-buttonProgress'

  test('Check Disabled', () => {
    render(
      <ThemeProvider theme={CustomTheme}>
        <CustomButton text="Custom-Button" color={'primary'} disabled={true} />
      </ThemeProvider>
    )
    expect(screen.getByRole('button', { name: 'Custom-Button' })).toBeDisabled()
  })

  test('Check Loading', () => {
    render(
      <ThemeProvider theme={CustomTheme}>
        <CustomButton text="Custom-Button" color={'primary'} loading={true} />
      </ThemeProvider>
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
      <ThemeProvider theme={CustomTheme}>
        <CustomButton
          text="Default-Behavior"
          color={'primary'}
          onClick={mockedOnClick}
        />
      </ThemeProvider>
    )
    const button = screen.getByRole('button', { name: 'Default-Behavior' })

    expect(button).toBeEnabled()
    expect(button).not.toContainHTML(loadingQuery)

    button.click()

    expect(button).toBeDisabled()
    expect(button).toContainHTML(loadingQuery)
  })
})
