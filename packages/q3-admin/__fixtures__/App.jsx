import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { useLoading } from 'q3-ui-rest';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TvIcon from '@material-ui/icons/Tv';
import Dashboard from '../src/components/Dashboard';
import Authentication from './datasource/Authentication';
import logo from '../src/__fixtures__/logo';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const DashboardRoute = () => (
  <Dashboard title="Sample app" version="1.0.0">
    <div />
  </Dashboard>
);

const ExampleApp = ({ initialPath }) => (
  <Loading>
    <LocationProvider initialPath={initialPath}>
      <Authentication>
        <Datasource>
          <Admin
            AppProps={{
              pages,
              customRoutes: [<DashboardRoute path="/" />],
            }}
            NavProps={{
              title: 'Demo app',
              logoSrc: logo,
            }}
            icons={{
              entertainment: BeachAccessIcon,
              shows: TvIcon,
            }}
            config={{
              shows: {
                Developer: [
                  'aside',
                  'files',
                  'picture',
                  'docs',
                  'notes',
                ],
              },
            }}
          />
        </Datasource>
      </Authentication>
    </LocationProvider>
  </Loading>
);

ExampleApp.propTypes = {
  initialPath: PropTypes.string,
};

ExampleApp.defaultProps = {
  initialPath: '/',
};

export default ExampleApp;
