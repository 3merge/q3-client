import React from 'react';
import { Container, Box } from '@material-ui/core';
import Filters from '../Filters';
import LoadMore from '../LoadMore';
import Timeline from '../Timeline';
import useAudit from '../useAudit';

const Audit = () => {
  const [filterState, setFilterState] = React.useState({
    date: new Date(),
    operation: ['added', 'deleted', 'updated'],
    user: '',
  });

  const state = useAudit(filterState);

  return (
    <Container maxWidth="xl" disableGutters>
      <Filters
        {...state}
        initialValues={filterState}
        onSubmit={setFilterState}
      />
      <Timeline {...state} />
      <Box align="center" my={2}>
        <LoadMore {...state} />
      </Box>
    </Container>
  );
};

export default Audit;
