import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Box } from '@material-ui/core';
import TableIo from '../TableIo';
import { Store } from '../state';
import Add from '../add';
import { useAppContext } from '../../hooks';

const CollectionActions = ({
  addComponent: AddForm,
  io,
}) => {
  const { can } = useAppContext({
    io: (
      <TableIo
        data={React.useContext(Store).data}
        io={io}
      />
    ),
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
  });

  return (
    <Fade in timeout={750}>
      <Box display="flex" whiteSpace="nowrap">
        {can('io')}
        {can('add')}
      </Box>
    </Fade>
  );
};

CollectionActions.defaultProps = {
  addComponent: null,
  io: null,
};

CollectionActions.propTypes = {
  addComponent: PropTypes.node,
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CollectionActions;
