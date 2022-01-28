import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import { useAppContext } from '../../hooks';
import ActionBar from '../../components/ActionBar';
import Search from '../../components/Search';
import Add from '../add';
import Segments from '../../components/Segments';

const TableActions = ({
  addComponent: AddForm,
  filterComponent: FilterComponent,
  io,
}) => {
  const ac = useAppContext({
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
    bulkDelete: <TableBulkDelete />,
    filter: FilterComponent ? (
      <>
        {/** Can't modify segments without filters */}
        <Segments />
        <FilterComponent />
      </>
    ) : null,
    io: <TableIo io={io} />,
  });

  return (
    <Fade in>
      <ActionBar>
        <Search />
        {ac.can('filter')}
        {ac.can('bulkDelete')}
        {ac.can('io')}
        {ac.can('add')}
      </ActionBar>
    </Fade>
  );
};

TableActions.defaultProps = {
  addComponent: null,
  filterComponent: null,
  io: null,
};

TableActions.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
  addComponent: PropTypes.element,
  filterComponent: PropTypes.element,
};

export default React.memo(TableActions);
