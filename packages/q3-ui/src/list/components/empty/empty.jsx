import React from 'react';
import Box from '@material-ui/core/Box';
import { Empty as EmptySvg } from 'q3-ui-assets';
import ErrorComponent from '../../../error';

const Empty = () => (
  <Box component="li" my={2}>
    <Box mt={5}>
      <ErrorComponent
        transparent
        title="empty"
        description="empty"
      >
        <EmptySvg />
      </ErrorComponent>
    </Box>
  </Box>
);

Empty.defaultProps = {
  onClick: null,
};

export default Empty;
