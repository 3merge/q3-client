import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';
import Authentication from './datasource/Authentication';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const Foo = () => <p>Custom profile view</p>;

const ExampleApp = ({ initialPath }) => {
  useTimezoneInterceptor();

  return (
    <Loading>
      <LocationProvider initialPath={initialPath}>
        <Authentication>
          <Datasource>
            <Admin
              AppProps={{
                pages,
              }}
              NavProps={{
                className: 'testing',
                title: 'Demo app',
                brand: '3merge',
                logoSrc:
                  'https://uploads-ssl.webflow.com/5f620c85bd4f6828cc8f637b/5f620cd411cb5e449a1db5cb_combined_logo_2-p-500.png',
                faviconSrc:
                  'https://avatars.githubusercontent.com/u/12897090?s=200&v=4',
              }}
              ProfileProps={{
                fields: <p>Append custom form fields!</p>,
                items: [
                  {
                    label: 'other',
                    component: Foo,
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
