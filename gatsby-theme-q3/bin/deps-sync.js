#!/usr/bin/env node

/* eslint-disable import/no-unresolved */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const packages = [
  'q3-admin',
  'q3-blocks',
  'q3-components',
  'q3-ui',
  'q3-ui-assets',
  'q3-ui-datatables',
  'q3-ui-dialog',
  'q3-ui-exports',
  'q3-ui-forms',
  'q3-ui-helpers',
  'q3-ui-locale',
  'q3-ui-permissions',
  'q3-ui-repeater',
  'q3-ui-rest',
  'q3-ui-test-utils',
];

const getPkgDeps = () => {
  const pkg = fs.readFileSync(
    path.resolve(process.cwd(), './package.json'),
    'utf8',
  );

  return Object.keys(JSON.parse(pkg).dependencies);
};

const runYarnCmd = (cmd, deps = []) => {
  if (Array.isArray(deps) && deps.length)
    execSync(`yarn ${cmd} ${deps.join(' ')}`);
};

const determineYarnCmd = (deps = []) =>
  packages.reduce(
    (acc, next) => {
      if (deps.includes(next)) {
        acc.upgrade.push(next);
      } else {
        acc.install.push(next);
      }

      return acc;
    },
    {
      install: [],
      upgrade: [],
    },
  );

const { install, upgrade } = determineYarnCmd(getPkgDeps());

runYarnCmd('add', install);
runYarnCmd('upgrade --latest', upgrade);
