import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyle from '../sidebar/useStyle';
import useHeight from '../sidebar/useHeight';

const SkeletonSidebar = () => {
  const height = useHeight();
  const { columnWidth, root } = useStyle({ height });

  return (
    <Grid item className={columnWidth}>
      <Skeleton
        id="app-sidebar"
        variant="rectangle"
        style={{
          backgroundColor: 'whitesmoke',
          height: '100%',
        }}
        className={root}
      />
    </Grid>
  );
};

export default SkeletonSidebar;
