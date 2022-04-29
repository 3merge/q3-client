import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { useLoading } from 'q3-ui-rest';
import Authentication from './datasource/Authentication';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';
import domain from './datasource/domain.json';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const ExampleApp = ({ initialPath }) => {
  // MUST SET THIS IN PRE CLIENT INIT
  // GATSBY HAS A HOOK FOR THIS.
  window.Q3_RUNTIME_CONFIG = domain;

  return (
    <Loading>
      <LocationProvider initialPath={initialPath}>
        <Authentication>
          <Datasource>
            <Admin
              AppProps={{
                pages,
                profilePages: [
                  {
                    component: () =>
                      'This is a custom profile page',
                    path: 'custom',
                    to: '/account/custom',
                    text: 'accountCustom',
                  },
                ],
              }}
            />
          </Datasource>
        </Authentication>
      </LocationProvider>
    </Loading>
  );
};

ExampleApp.propTypes = {
  initialPath: PropTypes.string,
};

ExampleApp.defaultProps = {
  initialPath: '/',
};

export default ExampleApp;
