import {
  configure,
  addParameters,
  addDecorator,
} from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { addReadme } from 'storybook-readme';
import { withA11y } from '@storybook/addon-a11y';
import path from 'path';
import withProviders from '../src/helpers/storyUtils';
import results from './jestResults.json';
import '../src/helpers/i18next';

const req = require.context(
  '../src',
  true,
  /.stories.jsx$/,
);

const loader = () => req.keys().forEach(req);

addDecorator(addReadme);
addDecorator(withA11y);
addDecorator(withProviders);
addDecorator(withTests({ results }));
// addParameters({ viewport: {} });
configure(loader, module);
