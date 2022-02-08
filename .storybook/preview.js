import React from 'react';
import {
  configure,
  addParameters,
  addDecorator,
} from '@storybook/react';

import {
  LocationProvider,
  createMemorySource,
  createHistory as createRouterHistory,
} from '@reach/router';

import path from 'path';
import Providers from 'q3-ui';
import Snackbar from 'q3-ui-forms';
import { makeDecorator } from '@storybook/addons';
import { Theme } from 'q3-admin';
import {
  DocsPage,
  DocsContainer,
} from '@storybook/addon-docs/blocks';
import json from './settings.json';

let firstHistoryObject = null;

function createHistory(initialPath) {
  if (firstHistoryObject) {
    firstHistoryObject.navigate(initialPath);
    return firstHistoryObject;
  }

  const source = createMemorySource(initialPath);

  firstHistoryObject = createRouterHistory(source);
  return firstHistoryObject;
}

export const withRouter = makeDecorator({
  name: 'router',
  parameterName: 'router',
  skipIfNoParametersOrOptions: true,

  wrapper: (getStory, context, { parameters = '/' }) => {
    let source = createMemorySource('/foo');
    let history = createHistory(source);
    return (
      <LocationProvider history={history}>
        {getStory(context)}
      </LocationProvider>
    );
  },
});

const req = require.context(
  '../packages',
  true,
  /^\.\/[^\/]+\/src\/.*stories\.jsx?$/,
);

addDecorator(withRouter);

addDecorator((story) => {
  return (
    <Providers {...json}>
      <Snackbar>{story()}</Snackbar>
    </Providers>
  );
});

addParameters({
  options: {
    selectedPanel: 'docs',
    // showPanel: false,
    panelPosition: 'right',
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

/*
configure(() => 
  req.keys().forEach(req), 
  module
);
*/
