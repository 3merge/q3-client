import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { useLoading } from 'q3-ui-rest';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TvIcon from '@material-ui/icons/Tv';
import { PaginationCard } from 'q3-ui/lib/pagination';
import Template from '../src/components/Template';
import Authentication from './datasource/Authentication';
import logo from '../src/__fixtures__/logo';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const Dash = () => (
  <Template muted>
    <div>
      <PaginationCard disabled>Hey</PaginationCard>
    </div>
  </Template>
);

const ExampleApp = ({ initialPath }) => (
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
              logoSrc: logo,
            }}
            ProfileProps={{
              fields: <p>Append custom form fields!</p>,
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

ExampleApp.propTypes = {
  initialPath: PropTypes.string,
};

ExampleApp.defaultProps = {
  initialPath: '/',
};

export default ExampleApp;
