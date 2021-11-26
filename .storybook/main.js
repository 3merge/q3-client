module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxBabelOptions: {
          babelrc: true,
          configFile: true,
        },
      },
    },
  ],

  stories: ['../packages/**/*.stories.mdx'],
};
