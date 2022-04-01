import * as React from 'react'
import { ReactNode, Component, Dispatch, SetStateAction, ChangeEventHandler, useState, ChangeEvent } from 'react'

import TextField from '@mui/material/TextField'
import { createStyles, Theme } from '@mui/material/styles'
import { withStyles, WithStyles } from '@mui/material/styles'
import clsx from 'clsx'


const styles = (theme: Theme) =>
  createStyles({
    input: {
      margin: theme.spacing(1),
      position: 'relative',
      opacity: 0.9,
      '&:hover': {
        opacity: 1,
      },
    },
    inputDisabled: {
      opacity: 1,
    },
  })


export interface CustomInputProps {
  id: string
  label: string
  value?: string
  type?: string
  variant?: 'standard' | 'filled' | 'outlined'
  handleValue?: Dispatch<SetStateAction<string>>
  onChangeHandler?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

function CustomInput(props: CustomInputProps) {
  const [value, setValue] = useState(props.value)
  const { id, label, type, variant, onChangeHandler, handleValue } = props

  function handleValueChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    handleValue?: Dispatch<SetStateAction<string>>,
    onChangeHandler?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value)
    if (handleValue) handleValue(event.target.value)
    if (onChangeHandler) onChangeHandler(event)
  }

  return (
    <TextField
      id={id}
      value={value}
      label={label}
      onChange={(e) => handleValueChange(e, handleValue, onChangeHandler)}
      type={type}
      variant={variant}
    />
  )
}

export default withStyles(styles)(CustomInput)
