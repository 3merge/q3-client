import React from 'react';
import {
  configure,
  addParameters,
  addDecorator,
} from '@storybook/react';
import Providers from 'q3-ui';
import Snackbar from 'q3-ui-rest';
import { withTests } from '@storybook/addon-jest';
import { addReadme } from 'storybook-readme';
import { withA11y } from '@storybook/addon-a11y';

import path from 'path';
import {
  LocationProvider,
  createMemorySource,
  createHistory as createRouterHistory,
} from '@reach/router';
import { makeDecorator } from '@storybook/addons'; 

let firstHistoryObject = null;
function createHistory(initialPath) {
  if (firstHistoryObject) {
    firstHistoryObject.navigate(initialPath);
    return firstHistoryObject;
  }

  const source = createMemorySource(initialPath);
  firstHistoryObject = createRouterHistory(source);
  firstHistoryObject.listen(() =>
    console.log(
      'message arrived at router',
      source.location,
    ),
  );
  return firstHistoryObject;
}

export const withRouter = makeDecorator({
  name: 'router',
  parameterName: 'router',
  skipIfNoParametersOrOptions: true,

  wrapper: (getStory, context, { parameters = '/' }) => {
    return (
      <LocationProvider history={createHistory(parameters)}>
        {getStory(context)}
      </LocationProvider>
    );
  },
});

const req = require.context(
  '../packages', true, 
  /^\.\/[^\/]+\/src\/.*stories\.jsx?$/,
);

addDecorator(withRouter);
addDecorator(addReadme);
addDecorator(withA11y);
addDecorator((story) => (
  <Providers>
    <Snackbar>
      {story()}
    </Snackbar>
  </Providers>
));

configure(() => 
  req.keys().forEach(req), 
  module
);
