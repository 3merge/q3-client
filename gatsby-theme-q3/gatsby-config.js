// eslint-disable-next-line
require('dotenv').config();

const genKey = (url) =>
  String(url).includes('netlify') ? 'disallow' : 'allow';

module.exports = ({
  contentfulSpaceID,
  contentfulAccessToken,
  siteUrl,
  title,
  brandingColor,
  icon,
  netlify,
  theme,
}) => {
  const plugins = [
    {
      resolve: 'gatsby-theme-q3-mui',
      options: {
        theme,
      },
    },
    'gatsby-plugin-material-ui',
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        // The option defaults to true
        checkSupportedExtensions: true,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.URL,
        sitemap: `${process.env.URL}/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [
              {
                userAgent: '*',
                [genKey(process.env.URL)]: '/',
              },
            ],
          },
        },
      },
    },
  ];

  if (contentfulSpaceID) {
    if (!contentfulAccessToken)
      throw new Error('Contentful access token missing');

    plugins.push({
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: contentfulSpaceID,
        accessToken: contentfulAccessToken,
      },
    });
  }

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
