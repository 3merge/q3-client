import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import { pick } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import ActionBar from '../../components/ActionBar';
import Search from '../../components/Search';
import Add from '../add';
import Segments from '../../components/Segments';
import { Definitions } from '../state';
import CollectionUiSelect from '../../components/CollectionUiSelect';

const SearchWithPermissions = () => {
  const { collectionName } = React.useContext(Definitions);
  const { canSeeSub } = useAuth(collectionName);
  return canSeeSub('grams') ? <Search /> : null;
};

const TableActions = ({
  addComponent: AddForm,
  filterComponent: FilterComponent,
  io,
  ui,
  uis,
  ...rest
}) => (
  <Fade in>
    <ActionBar>
      <SearchWithPermissions />
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
  ui: 'table',
  uis: [],
};

TableActions.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
  addComponent: PropTypes.element,
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
