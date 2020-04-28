import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonHeader = () => (
  <Skeleton
    id="app-header"
    variant="rectangle"
    style={{
      backgroundColor: '#FFF',
      height: 96,
      width: '100%',
    }}
  />
);

export default SkeletonHeader;
