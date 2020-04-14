import React from 'react';
import { withLocation } from 'with-location';
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
