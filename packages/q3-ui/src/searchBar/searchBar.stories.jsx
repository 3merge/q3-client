import React from 'react';
import { withLocation } from 'with-location';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Search from '.';

const getOptions = (s) => {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=1&name=${s}`,
  )
    .then((o) => o.json())
    .then(({ results }) => {
      return results.map((r) => ({
        name: r.name,
        description: r.species,
        photo: r.image,
        url: r.url,
      }));
    });
};

storiesOf('Components|SearchBar', module)
  .add(
    'With router search params',

    withLocation(({ params }) => (
      <>
        <Search
          getResults={getOptions}
          filter={() => <p>Filter me!</p>}
          icon={() => null}
        />
        <Box p={2}>
          <Typography>
            {`Search output on enter: ${params.toString()}`}
          </Typography>
        </Box>
      </>
    )),
  )
  .add(
    'Without filter',

    withLocation(({ params }) => (
      <>
        <Search getResults={getOptions} icon={() => null} />
        <Box p={2}>
          <Typography>
            {`Search output on enter: ${params.toString()}`}
          </Typography>
        </Box>
      </>
    )),
  );
