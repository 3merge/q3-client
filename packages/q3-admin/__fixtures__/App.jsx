import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TvIcon from '@material-ui/icons/Tv';
import { Tabs, Tab } from '@material-ui/core';
import Template from '../src/components/Template';
import Authentication from './datasource/Authentication';
import logo from '../src/__fixtures__/logo';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';
import Chart from '../src/containers/Chart';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const Dash = () => {
  const [state, setState] = React.useState();

  return (
    <Template muted>
      <Tabs value={0} aria-label="simple tabs example">
        <Tab value={0} label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>

      <Chart title="Sample chart" template="demo" />
    </Template>
  );
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
                customRoutes: [<Dash path="/" />],
              }}
              NavProps={{
                title: 'Demo app',
                logoSrc:
                  'https://logoipsum.com/logo/logo-15.svg',
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
              icons={{
                entertainment: BeachAccessIcon,
                shows: TvIcon,
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
