import * as React from 'react'
import { ReactNode, Component } from 'react'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { createStyles, Theme } from '@mui/material/styles'
import { withStyles, WithStyles } from '@mui/styles'


import clsx from 'clsx'

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      position: 'relative',
      opacity: 0.9,
      '&:hover': {
        opacity: 1,
      },
    },
    buttonDisabled: {
      opacity: 1,
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })

export interface CustomButtonProps extends WithStyles<typeof styles> {
  loading?: boolean
  disabled?: boolean
  defaultProcessingBehavior?: boolean
  onClick?: () => Promise<void>
  text: string
  color: 'primary' | 'secondary' | 'inherit'
  variant?: 'text' | 'outlined' | 'contained'
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export interface CustomButtonState {
  defaultProcessingBehavior: boolean
  isLoading: boolean
  disabled: boolean
}

class CustomButton extends Component<CustomButtonProps, CustomButtonState> {
  constructor(props: CustomButtonProps) {
    super(props)
    this.state = {
      defaultProcessingBehavior: props.defaultProcessingBehavior ?? true,
      disabled: props.disabled ?? false,
      isLoading: props.loading ?? false,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(onClickCallback?: () => Promise<void>) {
    if (!onClickCallback) {
      return
    }

    if (!this.state.defaultProcessingBehavior) {
      onClickCallback()
      return
    }

    this.handleButtonStateProcess(true)
    onClickCallback()
      .then(() => this.handleButtonStateProcess(false))
      .catch(() => this.handleButtonStateProcess(false))
  }

  handleButtonStateProcess(processing: boolean) {
    this.setState({ disabled: processing, isLoading: processing })
  }

  render() {
    const props = this.props
    let disabled: boolean
    let isLoading: boolean
    if (this.state.defaultProcessingBehavior) {
      disabled = this.state.disabled
      isLoading = this.state.isLoading
    } else {
      disabled = props.disabled || false
      isLoading = props.loading || false
    }

    return (
      <div
        className={clsx(props.classes.button, {
          [props.classes.buttonDisabled]: disabled,
        })}
      >
        <Button
          disabled={disabled}
          color={props.color}
          startIcon={props.startIcon}
          endIcon={props.endIcon}
          onClick={() => this.handleOnClick(props.onClick)}
          variant={props.variant}
        >
          {props.text}
          {isLoading && (
            <CircularProgress
              size={24}
              className={props.classes.buttonProgress}
              color={props.color}
            />
          )}
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(CustomButton)
