import React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from './pagination';

export default {
  title: 'Q3 UI/Components/Pagination',
};

export const WithPrevAndNext = () => (
  <Box p={4} style={{ backgroundColor: '#FFF' }}>
    <Pagination
      onPrev={() => null}
      onNext={() => null}
      nextDescription="Let's go to the next article"
      prevDescription="Let's go to the previous article"
    />
  </Box>
);

export const WithJustNext = () => (
  <Box p={4} style={{ backgroundColor: '#FFF' }}>
    <Pagination
      onNext={() => null}
      nextDescription="Let's go to the next article"
    />
  </Box>
);
