require('dotenv').config();

module.exports = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../packages/**/*.stories.mdx'],
  env: (config) => ({
    ...config,
    ...process.env,
    STORYBOOK_ENV: true,
  }),
};
