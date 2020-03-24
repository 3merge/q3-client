import React from 'react';
import Box from '@material-ui/core/Box';
import { Empty as EmptySvg } from 'q3-ui-assets';
import ErrorComponent from 'q3-ui/lib/error';

const Empty = () => (
  <Box p={2} style={{ backgroundColor: '#FFF' }}>
    <ErrorComponent
      transparent
      title="empty"
      description="empty"
    >
      <EmptySvg />
    </ErrorComponent>
  </Box>
);

Empty.propTypes = {};
Empty.defaultProps = {};

export default Empty;
