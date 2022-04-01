import { Dispatch, SetStateAction, ChangeEventHandler, useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'

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

export default CustomInput
