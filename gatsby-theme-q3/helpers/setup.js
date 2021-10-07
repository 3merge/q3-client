const path = require('path');
const fs = require('fs');
const { compact, get } = require('lodash');
const loadContent = require('./loadContent');
const loadTheme = require('./loadTheme');

const getFile = (possibleFileNames = []) =>
  possibleFileNames.reduce((acc, curr) => {
    if (acc) return acc;
    const filename = path.resolve(process.cwd(), curr);
    return fs.existsSync(filename) ? filename : undefined;
  }, undefined);

module.exports = (siteMetadata, plugins = []) => {
  const locale = loadContent(getFile(['locale', 'lang']));
  const theme = loadTheme(
    getFile(['theme.js', 'gatsby-theme.js', 'mui.js']),
  );

  return {
    siteMetadata: {
      appDirectory: '/app',
      author: '3merge',
      description: '',
      siteUrl: 'https://3merge.ca/',
      ...siteMetadata,
    },
    plugins: compact(
      [
        {
          resolve: 'gatsby-theme-q3',
          options: {
            icon: getFile([
              'static/favicon.png',
              'static/favicon.jpg',
            ]),

            brandingColor: get(
              theme,
              'palette.primary.main',
              '#000',
            ),

            locale,
            theme,
            ...siteMetadata,
          },
        },
      ].concat(plugins),
    ),
  };
};
