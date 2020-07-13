import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonRow = () => {
  const rows = [];

  for (let i = 0; i < 10; i += 1) {
    rows.push(
      <Skeleton
        variant="rect"
        height={67}
        width="100%"
        style={{
          backgroundColor: '#FFF',
          borderBottom: '2px solid #F5F7F9',
        }}
      />,
    );
  }

  return rows;
};

export default () => (
  <Box height="100%" width="100%">
    <SkeletonRow />
  </Box>
);
