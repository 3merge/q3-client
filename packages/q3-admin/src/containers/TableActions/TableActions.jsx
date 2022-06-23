import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import Segments from '../../components/Segments';
import CollectionUiSelect from '../../components/CollectionUiSelect';

const TableActions = ({
  filterComponent: FilterComponent,
  io,
  ui,
  uis,
  ...rest
}) => (
  <>
    <CollectionUiSelect uis={uis} />
    {FilterComponent ? (
      <>
        <Segments
          {...pick(rest, ['fromKey', 'toKey'])}
          ui={ui}
        />
        <FilterComponent />
      </>
    ) : null}
    <TableBulkDelete />
    <TableIo io={io} />
  </>
);

TableActions.defaultProps = {
  filterComponent: null,
  io: null,
  ui: 'table',
  uis: [],
};

TableActions.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),

  filterComponent: PropTypes.element,
  ui: PropTypes.string,
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default React.memo(TableActions);
