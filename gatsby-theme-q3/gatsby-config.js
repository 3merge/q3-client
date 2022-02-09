// eslint-disable-next-line
require('dotenv').config();

const genKey = (url) =>
  String(url).includes('netlify') ? 'disallow' : 'allow';

module.exports = (options) => {
  const plugins = [
    {
      resolve: 'gatsby-theme-q3-mui',
      options,
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
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        stripQueryString: true,
        siteUrl: process.env.URL,
      },
    },
  ];

  return {
    plugins,
  };
};
