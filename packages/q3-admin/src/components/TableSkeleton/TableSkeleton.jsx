import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTheme } from '@material-ui/core/styles';

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

const TableRow = () => {
  const theme = useTheme();
  return (
    <Skeleton
      variant="rect"
      height={61}
      style={{
        background: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.background.muted}`,
      }}
    />
  );
};

const TableSkeleton = () => (
  <Box py={5}>
    {Array.from({ length: 10 }).map((item, i) => (
      <TableRow key={i} />
    ))}
  </Box>
);
export default TableSkeleton;
