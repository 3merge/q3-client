const path = require('path');
const fs = require('fs');

const withDir = (str) => path.resolve(__dirname, str);

const root = '../templates';
const templates = fs.readdirSync(withDir(root));

const loader = (next) => {
  if (!next || typeof next !== 'function')
    throw new Error('Requires callback');

  return Promise.all(
    templates.map((name) => {
      try {
        return next({
          path: `/${name.split('.')[0]}`,
          component: require.resolve(
            withDir(`${root}/${name}`),
          ),
        });
      } catch (err) {
        return null;
      }
    }),
  );
};

loader.root = root;
loader.templates = templates;
module.exports = loader;
