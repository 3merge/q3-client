import React from 'react';
import Box from '@material-ui/core/Box';
import Graphic from 'q3-ui-assets';

const Empty = () => (
  <Box component="li" my={2}>
    <Graphic transparent title="empty" icon="Empty" />
  </Box>
);

Empty.defaultProps = {
  onClick: null,
};

export default Empty;
