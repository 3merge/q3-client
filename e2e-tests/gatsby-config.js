require('dotenv').config();

const { loadContent } = require('gatsby-theme-q3/helpers');
const path = require('path');
const theme = require('./gatsby-theme');
// const logo = require('./src/assets/logo.svg');

const {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
} = process.env;

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@gatsbyjs',
    siteUrl: 'https://google.ca',
    brand: '3merge',
    // logo,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-q3',
      options: {
        contentfulSpaceID: CONTENTFUL_SPACE_ID,
        contentfulAccessToken: CONTENTFUL_ACCESS_TOKEN,

        locale: loadContent(
          path.resolve(__dirname, './locale'),
        ),
        theme,
      },
    },
  ],
};
