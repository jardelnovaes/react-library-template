import { CustomTheme } from "../src";
import { ThemeProvider } from '@mui/styles/createStyles';
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';

//MUI V5 FIX from https://mui.com/guides/migration-v4/#storybook-emotion-with-v5
const withThemeProvider = (Story, context) => {
  return (
      <Emotion10ThemeProvider theme={CustomTheme}>
        <ThemeProvider theme={CustomTheme}>
          <Story {...context} />
        </ThemeProvider>
      </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
