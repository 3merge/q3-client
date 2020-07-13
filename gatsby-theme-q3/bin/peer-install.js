#!/usr/bin/env node

/* eslint-disable import/no-unresolved */
const path = require('path');
const fs = require('fs');

const { merge } = require('lodash');
const { execSync } = require('child_process');
const fw = require('find-yarn-workspace-root');
const packageJson = require('../package.json');

const getWorkspacePeerDeps = () => {
  const pkg = fs.readFileSync(
    path.join(fw(process.cwd()), 'package.json'),
    'utf8',
  );

  return JSON.parse(pkg).dependencies;
};

const getSupportedMuiVersions = (deps = []) =>
  Object.entries(deps).reduce((acc, [key, value]) => {
    if (key.startsWith('@material-ui')) {
      Object.assign(acc, {
        [key]: value,
      });
    }

    return acc;
  }, {});

fs.writeFile(
  path.resolve(__dirname, '../package.json'),
  JSON.stringify(
    merge({
      ...packageJson,
      peerDependencies: getSupportedMuiVersions(
        getWorkspacePeerDeps(),
      ),
    }),
  ),
  (err) => {
    // ensure differences are saved
    if (!err) execSync('yarn install');
  },
);
