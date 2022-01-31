import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import ActionBar from '../../components/ActionBar';
import Search from '../../components/Search';
import Add from '../add';
import Segments from '../../components/Segments';

const TableActions = ({
  addComponent: AddForm,
  filterComponent: FilterComponent,
  io,
}) => (
  <Fade in>
    <ActionBar>
      <Search />
      {FilterComponent ? (
        <>
          <Segments />
          <FilterComponent />
        </>
      ) : null}
      <TableBulkDelete />
      <TableIo io={io} />
      {AddForm ? (
        <Add>
          <AddForm />
        </Add>
      ) : null}
    </ActionBar>
  </Fade>
);

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
