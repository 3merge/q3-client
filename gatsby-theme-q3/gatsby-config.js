module.exports = ({
  contentfulSpaceID,
  contentfulAccessToken,
  siteUrl,
  title,
  brandingColor,
  icon,
  netlify,
}) => {
  if (!contentfulSpaceID || !contentfulAccessToken)
    throw new Error(
      'Contentful SpaceId and AccessToken required to configure filesystem',
    );

  const plugins = [
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-polyfill-io',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: contentfulSpaceID,
        accessToken: contentfulAccessToken,
      },
    },
  ];

  if (netlify)
    plugins.push({
      resolve: 'gatsby-plugin-netlify',
      options: {
        generateMatchPathRewrites: true,
      },
    });

  if (title && brandingColor)
    plugins.push({
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
    });

  if (siteUrl)
    plugins.push({
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        stripQueryString: true,
        siteUrl,
      },
    });

  return {
    plugins,
  };
};
