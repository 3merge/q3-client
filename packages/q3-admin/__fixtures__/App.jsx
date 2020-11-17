import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';

import { PaginationCard } from 'q3-ui/lib/pagination';
import Template from '../src/components/Template';
import Authentication from './datasource/Authentication';
import logo from '../src/__fixtures__/logo';
import Datasource from './datasource';
import Admin, {
  Templates,
  withAdminProviders,
} from '../src';
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

const Foo = () => <p>Custom profile view</p>;

const withConfig = (Component) => {
  const Wrapper = ({ initialPath }) => (
    <Loading>
      <LocationProvider initialPath={initialPath}>
        <Authentication>
          <Datasource>
            <Component
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

  Wrapper.propTypes = {
    initialPath: PropTypes.string,
  };

  Wrapper.defaultProps = {
    initialPath: '/',
  };

  return Wrapper;
};

export const Stack = withConfig(
  withAdminProviders(Templates.App.Stack),
);

export const MultiColumn = withConfig(
  withAdminProviders(Templates.App.MultiColumn),
);
