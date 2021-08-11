import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import Filters from '../Filters';
import LoadMore from '../LoadMore';
import Timeline from '../Timeline';
import withAuditAuth from '../withAuditAuth';
import useAudit from '../useAudit';

export const Audit = ({ collectionName, id }) => {
  const [filterState, setFilterState] = React.useState({
    date: new Date(),
    operation: ['added', 'deleted', 'updated'],
    user: '',
  });

  const state = useAudit({
    collectionName,
    id,
    ...filterState,
  });

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

Audit.defaultProps = {
  id: undefined,
};

Audit.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withAuditAuth(Audit);
