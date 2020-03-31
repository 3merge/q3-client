import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../utils/useStyles';
import Wrapper from './wrapper';

const SkeletonRow = () => {
  const { rowlike } = useStyles();
  const rows = [];

  for (let i = 0; i < 10; i += 1) {
    rows.push(
      <Skeleton
        variant="rect"
        height={67}
        width="100%"
        className={rowlike}
      />,
    );
  }

  return rows;
};

export default () => (
  <Wrapper>
    <Box height="100%" width="100%">
      <SkeletonRow />
    </Box>
  </Wrapper>
);
