import React from 'react';
import PropTypes from 'prop-types';
import TableIo from '../TableIo';
import { Store } from '../state';
import { useAppContext } from '../../hooks';
import withActionPortal from '../../components/withActionPortal';

/** @NOTE eventually bulk editting */
const TableActions = ({ io }) =>
  useAppContext({
    io: (
      <TableIo
        data={React.useContext(Store).data}
        io={io}
      />
    ),
  }).can('io');

TableActions.defaultProps = {
  io: null,
};

TableActions.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default withActionPortal(TableActions, {
  elementId: 'q3-collection-actions-top',
});
