import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Fade from '@material-ui/core/Fade';
import FigureWrapper from '../FigureWrapper';

export const FigureSkeleton = (props) => (
  <FigureWrapper {...props}>
    <Fade in>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height={45}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <Skeleton
              animation="wave"
              variant="circle"
              width={45}
              height={45}
              style={{ marginRight: '1rem' }}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={45}
              height={45}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            animation="wave"
            variant="rect"
            width="100%"
            height="350px"
          />
        </Grid>
      </Grid>
    </Fade>
  </FigureWrapper>
);

export default FigureSkeleton;
