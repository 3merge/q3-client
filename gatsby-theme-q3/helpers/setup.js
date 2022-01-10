const path = require('path');
const fs = require('fs');
const { compact, get } = require('lodash');
const loadContent = require('./loadContent');
const loadTheme = require('./loadTheme');

const getFile =
  (directory) =>
  (possibleFileNames = []) =>
    possibleFileNames.reduce((acc, curr) => {
      if (acc) return acc;
      const filename = path.resolve(directory, curr);
      return fs.existsSync(filename) ? filename : undefined;
    }, undefined);

module.exports = (
  siteMetadata,
  plugins = [],
  workingDirection = process.cwd(),
) => {
  const f = getFile(workingDirection);

  const locale = loadContent(f(['locale', 'lang']));
  const theme = loadTheme(
    f(['theme.js', 'gatsby-theme.js', 'mui.js']),
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
            icon: f([
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
