import * as React from 'react'
import { Component } from 'react'

export interface CompositeFormProps {
  text: string
}

class CompositeForm extends Component<CompositeFormProps> {
  render() {
    return (
      <div>
        <h2>Login: {this.props.text}</h2>
      </div>
    )
  }
}

export default CompositeForm
