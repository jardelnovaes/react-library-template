import * as React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import { default as CheckBoxIcon } from '@material-ui/icons/CheckBox'
import { default as SearchIcon } from '@material-ui/icons/Search'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { onClick } from './Utils'
import CustomButton from '~/input/CustomButton'
import { CustomTheme } from '~/themes'

import './assets/fonts'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Jardel Novaes UI React/CustomButton',
  component: CustomButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: {
      type: { name: 'string' },
    },
    color: {
      options: ['primary', 'secondary', 'inherit'],
      control: { type: 'radio' },
    },
    disabled: {
      type: { name: 'boolean' },
    },
    defaultProcessingBehavior: {
      type: { name: 'boolean', defaultValue: true },
    },
    loading: {
      type: { name: 'boolean' },
    },
  },
} as ComponentMeta<typeof CustomButton>

const TemplateLeftIcon: ComponentStory<typeof CustomButton> = (args) => (
  <ThemeProvider theme={CustomTheme}>
    <CustomButton {...args} endIcon={<SearchIcon />} />
  </ThemeProvider>
)

const TemplateRightIcon: ComponentStory<typeof CustomButton> = (args) => (
  <ThemeProvider theme={CustomTheme}>
    <CustomButton {...args} startIcon={<CheckBoxIcon />} />
  </ThemeProvider>
)

export const Default = TemplateLeftIcon.bind({})
Default.args = {
  text: 'Default',
  color: 'primary',
  defaultProcessingBehavior: true,
  onClick: onClick,
}

export const Disabled = TemplateLeftIcon.bind({})
Disabled.args = {
  text: 'Disabled',
  color: 'primary',
  disabled: true,
}

export const RightIcon = TemplateRightIcon.bind({})
RightIcon.args = {
  text: 'Right Icon',
  color: 'secondary',
  onClick: onClick,
}
