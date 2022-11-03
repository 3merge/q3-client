import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hidden } from '@material-ui/core';
import ActionBarTemplate from '../../components/ActionBarTemplate';
import ActionBar from '../../components/ActionBar';
import ToolbarPortal from '../../components/ToolbarPortal';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';

const TableActions = ({
  filterComponent: FilterComponent,
  io,
  registerActions,
}) => (
  <>
    {FilterComponent && (
      <ToolbarPortal id="appbar-filter">
        <FilterComponent />
      </ToolbarPortal>
    )}
    <ActionBar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          {FilterComponent ? (
            <Hidden mdDown>
              <FilterComponent />
            </Hidden>
          ) : null}
          <ActionBarTemplate
            registerActions={registerActions}
          />
          <TableIo io={io} />
          <TableBulkDelete />
        </Box>
      </Box>
    </ActionBar>
  </>
);

TableActions.defaultProps = {
  filterComponent: null,
  io: null,
  registerActions: null,
};

TableActions.propTypes = {
  filterComponent: PropTypes.element,
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
  registerActions: PropTypes.func,
};

export default React.memo(TableActions);
