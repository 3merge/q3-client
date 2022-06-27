import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Box, Hidden } from '@material-ui/core';
import ActionBar from '../../components/ActionBar';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import ActionBarTemplate from '../../components/ActionBarTemplate';
import Segments from '../../components/Segments';
import CollectionUiSelect from '../../components/CollectionUiSelect';

const TableActions = ({
  filterComponent: FilterComponent,
  io,
  registerActions,
  ui,
  uis,
  ...rest
}) => (
  <>
    {FilterComponent && (
      <Hidden lgUp>
        <Box
          alignItems="center"
          display="flex"
          height={65}
          position="fixed"
          right={60}
          top={0}
        >
          <FilterComponent />
        </Box>
      </Hidden>
    )}
    <ActionBar>
      <CollectionUiSelect uis={uis} />
      {FilterComponent ? (
        <>
          <Segments
            {...pick(rest, ['fromKey', 'toKey'])}
            ui={ui}
          />
          <Hidden mdDown>
            <FilterComponent />
          </Hidden>
        </>
      ) : null}
      <ActionBarTemplate
        registerActions={registerActions}
      />
      <TableIo io={io} />
      <TableBulkDelete />
    </ActionBar>
  </>
);

TableActions.defaultProps = {
  filterComponent: null,
  io: null,
  registerActions: null,
  ui: 'table',
  uis: [],
};

TableActions.propTypes = {
  filterComponent: PropTypes.element,
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
  registerActions: PropTypes.func,
  ui: PropTypes.string,
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default React.memo(TableActions);
