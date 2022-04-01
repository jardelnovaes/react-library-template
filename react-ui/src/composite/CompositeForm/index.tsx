import * as React from 'react'
import { Component } from 'react'
import { CustomButton, CustomInput } from 'input'
import { FormControl } from '@mui/material'

export interface CompositeFormProps {
  text: string
}

class CompositeForm extends Component<CompositeFormProps> {
  render() {
    return (
      <>
      <h2>Info: {this.props.text}</h2>
      <FormControl>
        <CustomInput value={'e-mail'} id={'email'} label={'e-mail'} />
        <CustomButton color='primary' text='Login' />
      </FormControl>
      </>
    )
  }
}

export default CompositeForm
