import React from 'react';
import { withLocation } from 'with-location';
import { Link } from '@reach/router';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Search from '.';
import results from './__fixtures__';

const getOptions = (s) => {
  return Promise.resolve(results).then((r) =>
    r
      .map((item) => ({
        name: item.name,
        description: item.species,
        photo: item.image,
        url: item.url,
      }))
      .filter((item) => JSON.stringify(item).includes(s)),
  );
};

export default {
  title: 'Q3 UI|Components/Search',
  parameters: {
    component: Search,
    componentSubtitle: 'Expandable search bar',
  },
};

export const Example = withLocation(({ params }) => (
  <>
    <Search getResults={getOptions} redirectPath="/" />
    <Box p={2}>
      <Typography>
        {`Search output on enter: ${params.toString()}`}
      </Typography>
    </Box>
  </>
));

export const OnPageChange = () => (
  <LocationProvider>
    <Search getResults={getOptions} redirectPath="/" />
    <Link to="/foo">Next Page</Link>
    <Link to="/bar">Next Page</Link>
    <LocationDebugger />
  </LocationProvider>
);
