import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../utils/useStyles';
import Wrapper from './wrapper';

const SkeletonRow = () => {
  const { rowlike } = useStyles();
  return (
    <Skeleton
      variant="rect"
      height={67}
      width="100%"
      className={rowlike}
    />
  );
};

export default () => (
  <Wrapper>
    <Box>
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </Box>
  </Wrapper>
);
