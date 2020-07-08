import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyle from '../SidePanel/useStyle';

const SkeletonSidebar = () => {
  const cls = useStyle();

  return (
    <Grid item className={cls.root}>
      <Skeleton
        id="app-sidebar"
        variant="rectangle"
        className={cls.scroller}
        style={{
          backgroundColor: '#FFF',
        }}
      />
    </Grid>
  );
};

export default SkeletonSidebar;
