module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
  ],

  stories: ['../packages/**/*.stories.mdx'],
};
