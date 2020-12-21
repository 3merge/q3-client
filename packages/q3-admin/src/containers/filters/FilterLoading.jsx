import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const FilterLoading = () =>
  Array.from({ length: 4 }).map((item, i) => (
    <Box key={i} mb={0.25}>
      <Skeleton height={38} variant="rect" />
    </Box>
  ));

export default FilterLoading;
