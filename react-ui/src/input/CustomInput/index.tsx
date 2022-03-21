import * as React from 'react'
import { ReactNode, Component } from 'react'

import TextField from '@material-ui/core/TextField'
import { createStyles, Theme } from '@material-ui/core/styles'
import { withStyles, WithStyles } from '@material-ui/core/styles'
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

export interface CustonInputProps extends WithStyles<typeof styles> {
  text: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
}

class CustonInput extends Component<CustonInputProps> {
  constructor(props: CustonInputProps) {
    super(props)
  }

  render() {
    const props = this.props
    return (
      <div
        className={clsx(props.classes.input, {
          [props.classes.inputDisabled]: props.disabled,
        })}
      >
        <TextField
          disabled={props.disabled}
          color={props.color}
          variant={'outlined'}
          label={props.text}
        />
      </div>
    )
  }
}

export default withStyles(styles)(CustonInput)
