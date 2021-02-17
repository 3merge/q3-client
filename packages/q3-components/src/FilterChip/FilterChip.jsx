import React from 'react';
import { size } from 'lodash';
import Box from '@material-ui/core/Box';
import { useActiveQueryParams } from 'q3-ui-queryparams';
import FilterChipExpandable from '../FilterChipExpandable';

const FilterChip = () => {
  const chips = useActiveQueryParams();

  return size(chips) ? (
    <Box id="q3-filter-chips" display="inline-block" px={2}>
      {chips.map((chip) => (
        <FilterChipExpandable key={chip.label} {...chip} />
      ))}
    </Box>
  ) : null;
};

export default FilterChip;
