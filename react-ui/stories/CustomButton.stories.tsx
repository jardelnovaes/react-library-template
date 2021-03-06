import { default as CheckBoxIcon } from '@mui/icons-material/CheckBox'
import { default as SearchIcon } from '@mui/icons-material/Search'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { onClick } from './Utils'
import { CustomButton } from '~/input/CustomButton'

import '@stories/assets/fonts'


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
      description: 'Material UI color options',
    },
    variant: {
      options: ['contained', 'text', 'outlined'],
      control: { type: 'radio' },
      description: 'Material UI variant options',
    },
    disabled: {
      type: { name: 'boolean' },
    },
    defaultProcessingBehavior: {
      type: { name: 'boolean' },
      description:
        'When true the button will use default behave (disabled and loading process until the processing was completed)',
    },
    loading: {
      type: { name: 'boolean' },
      description: 'Shows loading process',
    },
    startIcon: {
      description: 'Material UI Icon before de text',
    },
    endIcon: {
      description: 'Material UI Icon after de text',
    },
  },
} as ComponentMeta<typeof CustomButton>

const TemplateLeftIcon: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} endIcon={<SearchIcon />} />
)

const TemplateRightIcon: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} startIcon={<CheckBoxIcon />} />
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
