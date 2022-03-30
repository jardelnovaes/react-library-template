import * as React from 'react'
import '@testing-library/jest-dom'
import { ChangeEvent } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CustomInput from './CustomInput'

describe('CustomInput Tests', () => {
  test('Check Initial Value', () => {
    render(
      <CustomInput id={'input-1'} label={'Input 1'} value={'Initial Value'} />
    )
    expect(screen.getByLabelText('Input 1')).toContainHTML('Initial Value')
  })

  test('Check Value Changed', () => {
    render(
      <CustomInput id={'input-1'} label={'Input 2'} value={'Initial Value'} />
    )
    const input = screen.getByLabelText('Input 2') as HTMLInputElement

    expect(input).toContainHTML('Initial Value')

    userEvent.clear(input)
    userEvent.type(input, 'new value!')

    expect(input.value).toBe('new value!')
  })

  test('Check Custom onChangeHandler', () => {
    let changeAction = 'nothing'

    const mockedOnChangeHandler = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      changeAction = `Custom::${event.target.value}`
    }

    render(
      <CustomInput
        id={'input-1'}
        label={'Input 3'}
        value={'Initial Value'}
        onChangeHandler={mockedOnChangeHandler}
      />
    )
    const input = screen.getByLabelText('Input 3') as HTMLInputElement

    expect(input).toContainHTML('Initial Value')

    userEvent.clear(input)
    userEvent.type(input, 'new value!')

    expect(changeAction).toBe('Custom::new value!')
  })

  test('Check handleValue', () => {
    let changeAction = 'nothing'

    const mockedHandleValue = () => {
      changeAction = 'mockedHandleValue was called'
    }

    render(
      <CustomInput
        id={'input-1'}
        label={'Input 4'}
        value={'Initial Value'}
        handleValue={mockedHandleValue}
      />
    )
    const input = screen.getByLabelText('Input 4') as HTMLInputElement

    expect(input).toContainHTML('Initial Value')

    userEvent.clear(input)
    userEvent.type(input, 'new value!')

    expect(changeAction).toBe('mockedHandleValue was called')
  })
})
