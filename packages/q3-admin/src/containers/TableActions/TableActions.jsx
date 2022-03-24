import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import { useAuth } from 'q3-ui-permissions';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import { size } from 'lodash';
import TableBulkDelete from '../TableBulkDelete';
import TableIo from '../TableIo';
import ActionBar from '../../components/ActionBar';
import Search from '../../components/Search';
import Add from '../add';
import Segments from '../../components/Segments';
import { Definitions } from '../state';
import DropdownMenu from '../../components/DropdownMenu';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const SearchWithPermissions = () => {
  const { collectionName } = React.useContext(Definitions);
  const { canSeeSub } = useAuth(collectionName);
  return canSeeSub('grams') ? <Search /> : null;
};

const TableActions = ({
  addComponent: AddForm,
  filterComponent: FilterComponent,
  io,
  uis,
}) => (
  <Fade in>
    <ActionBar>
      <SearchWithPermissions />
      {size(uis) > 0 && (
        <DropdownMenu items={uis}>
          {(onClick) => (
            <ButtonWithIcon
              icon={ViewQuiltIcon}
              label="uis"
              onClick={onClick}
            />
          )}
        </DropdownMenu>
      )}
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
  uis: [],
};

TableActions.propTypes = {
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
  addComponent: PropTypes.element,
  filterComponent: PropTypes.element,
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default React.memo(TableActions);
