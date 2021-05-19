import React from 'react';
import PropTypes from 'prop-types';
import TableIo from '../TableIo';
import { Store } from '../state';
import Add from '../add';
import { useAppContext } from '../../hooks';

const CollectionActions = ({
  addComponent: AddForm,
  io,
}) => {
  const actions = {
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
  };

  const { can } = useAppContext(actions);
  return Object.keys(actions).map(can);
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
