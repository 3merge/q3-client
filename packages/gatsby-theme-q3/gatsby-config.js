module.exports = ({
  contentfulSpaceID,
  contentfulAccessToken,
  siteUrl,
}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: contentfulSpaceID,
        accessToken: contentfulAccessToken,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        stripQueryString: true,
        siteUrl,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-polyfill-io',
    'gatsby-plugin-material-ui',
  ],
});
