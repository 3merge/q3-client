const path = require('path');

module.exports = {
  extends: ['react-3merge'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, '../packages'),
      },
    },
  },
};
