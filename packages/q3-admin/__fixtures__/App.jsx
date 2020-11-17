import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';
import { Link } from '@reach/router';
import { PaginationCard } from 'q3-ui/lib/pagination';
import Collection from 'q3-admin/lib/containers/collection';
import CollectionDatasource from 'q3-admin/lib/containers/CollectionDatasource';
import List from 'q3-admin/lib/containers/table';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSegments } from 'q3-hooked';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Template from '../src/components/Template';
import Authentication from './datasource/Authentication';
import logo from '../src/__fixtures__/logo';
import Datasource from './datasource';
import { Templates, withAdminProviders } from '../src';
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

const CustomAddSequence = () => <div>ADD NEW</div>;

const Segments = () => {
  const s = useSegments();

  return (
    <Tabs value={0}>
      {s.filters.map((filter, i) => (
        <Tab
          value={i}
          component={Link}
          to={filter.searchValue}
          {...filter}
        />
      ))}
    </Tabs>
  );
};

const CustomShows = () => (
  <Collection
    collectionName="shows"
    resourceName="shows"
    resourceNameSingular="show"
  >
    <Container>
      <CollectionDatasource>
        <Box my={4}>
          <Typography variant="h1">
            Title of the page
          </Typography>
          <Segments />
          <List
            defaultColumns={['createdAt', 'updatedAt']}
          />
        </Box>
      </CollectionDatasource>
    </Container>
  </Collection>
);

const withConfig = (Component) => {
  const Wrapper = ({ initialPath }) => {
    useTimezoneInterceptor();

    return (
      <Loading>
        <LocationProvider initialPath={initialPath}>
          <Authentication>
            <Datasource>
              <Component
                AppProps={{
                  pages,
                  customRoutes: [
                    <Dash path="/" />,
                    <CustomShows path="/custom" />,
                    <CustomAddSequence path="/custom/add" />,
                  ],
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
  };

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
