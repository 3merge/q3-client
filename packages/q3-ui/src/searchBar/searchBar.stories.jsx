import React from 'react';
import { Location } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Search from '.';

const getOptions = (s) => {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=1&name=${s}`,
  )
    .then((o) => o.json())
    .then(({ results }) => results);
};

storiesOf('Components|SearchBar', module).add(
  'With router search params',
  () => (
    <Location>
      {({ location }) => (
        <>
          <Search getResults={getOptions} />
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
  ),
);
