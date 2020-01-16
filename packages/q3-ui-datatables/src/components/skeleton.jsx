import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../utils/useStyles';

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
  <Box>
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </Box>
);
