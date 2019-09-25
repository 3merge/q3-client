import React from 'react';
import { Location } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import sidebar from './README.md';
import Search from '.';

storiesOf('Components|SearchBar', module)
  .addParameters({
    jest: ['profileBar'],
    readme: {
      sidebar,
    },
  })
  .add('With router search params', () => (
    <Location>
      {({ location }) => (
        <>
          <Search />
          <Box p={2}>
            <Typography>
              {`Search output on enter: ${JSON.stringify(
                location.search,
              )}`}
            </Typography>
          </Box>
        </>
      )}
    </Location>
  ));
