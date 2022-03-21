import * as React from 'react'
import { ReactNode, Component } from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, Theme } from '@material-ui/core/styles'
import { withStyles, WithStyles } from '@material-ui/core/styles'
// import { WithStyles } from '@material-ui/core/styles'
//import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

//import styles from './styles'

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

//export default styles

export interface CustonButtonProps extends WithStyles<typeof styles> {
  loading?: boolean
  disabled?: boolean
  defaultProcessingBehavior?: boolean
  onClick?: () => Promise<void>
  text: string
  color: 'primary' | 'secondary' | 'inherit'
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export interface CustonButtonState {
  defaultProcessingBehavior: boolean
  isLoading: boolean
  disabled: boolean
}

class CustonButton extends Component<CustonButtonProps, CustonButtonState> {
  constructor(props: CustonButtonProps) {
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
          variant={'contained'}
        >
          {':2.1 ' + props.text}
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

export default withStyles(styles)(CustonButton)
