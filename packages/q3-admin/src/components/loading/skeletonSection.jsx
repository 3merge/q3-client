import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useHeight from '../sidebar/useHeight';

const SkeletonSection = () => {
  const height = useHeight();

  return (
    <Skeleton
      variant="rectangle"
      style={{
        backgroundColor: '#FFF',
        width: '100%',
        height,
      }}
    />
  );
};

export default SkeletonSection;
