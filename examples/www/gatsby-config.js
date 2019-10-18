require('dotenv').config();

const {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  URL,
} = process.env;

const siteMetadata = {
  title: '3merge inc.',
  siteUrl: URL,
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-theme-q3',
      options: {
        generateAccountPages: true,
        contentfulSpaceID: CONTENTFUL_SPACE_ID,
        contentfulAccessToken: CONTENTFUL_ACCESS_TOKEN,
        brandingColor: 'purple',
        icon: './src/images/fav.png',
        ...siteMetadata,
      },
    },
  ],
};
