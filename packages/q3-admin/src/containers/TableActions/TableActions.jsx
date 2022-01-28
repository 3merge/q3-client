import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fade } from '@material-ui/core';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import { Store } from '../state';
import { useAppContext } from '../../hooks';
import ActionBar from '../../components/ActionBar';
import Search from '../../components/Search';
import Add from '../add';
import Segments from '../../components/Segments';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const TableActions = ({
  addComponent: AddForm,
  filterComponent: FilterComponent,
  io,
}) => {
  const { data } = React.useContext(Store);

  const ac = useAppContext({
    io: <TableIo data={data} io={io} />,
    bulkDelete: <TableBulkDelete />,
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
    filter: FilterComponent ? (
      <Dialog
        title="filter"
        variant="drawer"
        renderContent={() => <FilterComponent />}
        renderTrigger={(onClick) => (
          <ButtonWithIcon
            icon={FilterListIcon}
            label="filter"
            onClick={onClick}
          />
        )}
      />
    ) : null,
  });

  // float bottom on mobile.
  return (
    <Fade in>
      <ActionBar>
        <Search />
        <Segments />
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

export default TableActions;
