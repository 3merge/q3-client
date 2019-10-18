module.exports = ({
  contentfulSpaceID,
  contentfulAccessToken,
  siteUrl,
  title,
  brandingColor,
  icon,
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        short_name: title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: brandingColor,
        display: 'standalone',
        name: title,
        icon,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-polyfill-io',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-offline',
  ],
});
