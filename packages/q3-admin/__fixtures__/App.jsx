import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';
import { Router, Link } from '@reach/router';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TvIcon from '@material-ui/icons/Tv';
import { PaginationCard } from 'q3-ui/lib/pagination';
import Collection from 'q3-admin/lib/containers/collection';
import CollectionDatasource from 'q3-admin/lib/containers/CollectionDatasource';
import List from 'q3-admin/lib/containers/table';
import CollectionFilter from 'q3-admin/lib/containers/CollectionFilter';
import Container from '@material-ui/core/Container';
import { Builders } from 'q3-ui-forms';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSegments } from 'q3-hooked';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
