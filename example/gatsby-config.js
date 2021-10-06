const { loadContent } = require('gatsby-theme-q3/helpers');
const path = require('path');
const theme = require('./gatsby-theme');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@gatsbyjs',
    siteUrl: 'https://google.ca',
    brand: '3merge',
    appDirectory: '/app',
    logo: '/logo.svg',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-q3',
      options: {
        locale: loadContent(
          path.resolve(__dirname, './locale'),
        ),
        theme,
      },
    },
  ],
};
