import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const TableButton = () => (
  <Box mr={2}>
    <Skeleton
      style={{
        display: 'block',
        height: 36,
        marginBottom: '1rem',
        width: '8vw',
      }}
    />
  </Box>
);

const TableRow = () => (
  <Skeleton
    variant="rect"
    height={61}
    style={{
      background: 'white',
      borderTop: '2px solid rgb(245, 247, 249)',
    }}
  />
);

const TableSkeleton = () => (
  <Box>
    <Box pt={1} mb={2} width="100%" px={1}>
      <Grid container justify="space-between">
        <Grid item xs={8}>
          <Skeleton
            height={36}
            style={{
              marginBottom: '1rem',
              width: '25vw',
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <TableButton />
          <TableButton />
        </Grid>
      </Grid>
    </Box>
    {Array.from({ length: 10 }).map((item, i) => (
      <TableRow key={i} />
    ))}
  </Box>
);
export default TableSkeleton;
