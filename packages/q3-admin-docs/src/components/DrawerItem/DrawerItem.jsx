import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import useRest from 'q3-ui-rest';

const DrawerItem = ({ id }) => {
  const r = useRest({
    url: `/documentation/${id}`,
    runOnInit: true,
    key: 'document',
  });

  if (r.fetching)
    return (
      <Box width="100%">
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </Box>
    );

  if (r.fetchingError) return 'ERRROR';

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: r?.document?.content,
      }}
    />
  );
};

export default DrawerItem;
