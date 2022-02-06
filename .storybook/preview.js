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
    <Theme
      getTheme={() =>
        new Promise((res) => {
          setTimeout(() => {
            res({
              lng: 'en',
              resources: {
                labels: {
                  shows: 'Shows',
                },
              },
            });
          }, 500);
        })
      }
    >
      {(themeProps) => (
        <Providers
          {...themeProps}
          addLocaleHandler={(args) => {
            console.log('Locale update: ', args);
            return Promise.resolve({});
          }}
          loadLocaleHandler={(args) => {
            console.log('Locale request: ', args);
            return new Promise((res) => {
              setTimeout(() => {
                res(
                  args.lng === 'en'
                    ? {
                        labels: {
                          shows: 'Shows',
                          all: 'All',
                          entertainment: 'Entertainment',
                        },
                      }
                    : {
                        labels: {
                          shows: 'Spectacles',
                          all: 'Toute',
                          entertainment: 'Divertissement',
                        },
                      },
                );
              }, 50);
            });
          }}
        >
          <Snackbar>{story()}</Snackbar>
        </Providers>
      )}
    </Theme>
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
