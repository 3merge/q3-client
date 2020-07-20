import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import { State } from 'q3-ui-exports';
import TableCell from '@material-ui/core/TableCell';
import BulkEditorDrawer from './BulkEditorDrawer';
import BulkDeleteModal from './BulkDeleteModal';

export const findByLabel = (a, b) =>
  a.find(({ label }) => label === b.label);

const CustomActionBar = ({
  renderSelected,
  renderUnselected,
  data,
}) => {
  const { checked } = React.useContext(State);

  return checked.length ? (
    <TableCell
      component="th"
      colSpan="100%"
      style={{ textAlign: 'right' }}
    >
      {renderSelected && (
        <BulkEditorDrawer
          ids={checked}
          renderTrigger={(onClick) => (
            <IconButton
              icon={Edit}
              label="bulkUpdate"
              buttonProps={{ onClick }}
            />
          )}
        >
          {renderSelected}
        </BulkEditorDrawer>
      )}
      <BulkDeleteModal
        ids={checked}
        renderTrigger={(onClick) => (
          <IconButton
            icon={DeleteForeverIcon}
            label="bulkDelete"
            buttonProps={{
              onClick,
            }}
          />
        )}
      />
    </TableCell>
  ) : (
    <>
      {renderUnselected}
      <TableCell component="th" colSpan="100%" />
    </>
  );
};

CustomActionBar.propTypes = {};

export default CustomActionBar;
