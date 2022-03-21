const path = require("path")

module.exports = {
  stories: ['../src/**/**/*.stories.mdx', '../src/**/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  "webpackFinal": async (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, '../src')
    config.resolve.alias['@stories'] = path.resolve(__dirname, '../stories')
    return config
  }
};
