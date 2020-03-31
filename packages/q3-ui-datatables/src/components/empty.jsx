/* eslint-disable no-param-reassign */
import React from 'react';
import Box from '@material-ui/core/Box';
import ErrorComponent from 'q3-ui/lib/error';
import { Empty } from 'q3-ui-assets';

export default () => (
  <Box pt={4} pb={2} style={{ backgroundColor: '#FFF' }}>
    <ErrorComponent title="empty" description="empty">
      <Empty />
    </ErrorComponent>
  </Box>
);
