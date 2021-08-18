import React from 'react';
import PropTypes from 'prop-types';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import { Store } from '../state';
import { useAppContext } from '../../hooks';
import withActionPortal from '../../components/withActionPortal';

/** @NOTE eventually bulk editting */
const TableActions = ({ io }) => {
  const { data } = React.useContext(Store);

  const ac = useAppContext({
    io: <TableIo data={data} io={io} />,
    bulkDelete: <TableBulkDelete />,
  });

  return (
    <>
      {ac.can('bulkDelete')}
      {ac.can('io')}
    </>
  );
};

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
