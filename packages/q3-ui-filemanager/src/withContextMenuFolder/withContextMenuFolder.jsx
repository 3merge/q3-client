import React from 'react';
import PropTypes from 'prop-types';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useDialog from '../useDialog';
import ContextMenu from '../ContextMenu';

const withContextMenuFolder = (Component) => {
  const ContextMenuImplementation = (props) => {
    const { id } = props;
    const { open: openMoveTo } = useDialog(
      'q3-file-dialog-move-to',
      props,
    );

    const { open: openDeleteDialog } = useDialog(
      'q3-file-dialog-delete',
      props,
    );

    const { open: openRenameDialog } = useDialog(
      'q3-file-dialog-rename-folder',
      props,
    );

    return (
      <ContextMenu
        id={id}
        items={[
          {
            icon: <EditIcon />,
            label: 'rename',
            onClick: openRenameDialog,
          },
          {
            icon: <AccountTreeIcon />,
            label: 'moveTo',
            onClick: openMoveTo,
          },
          {
            icon: <DeleteIcon />,
            label: 'delete',
            onClick: openDeleteDialog,
          },
        ]}
      >
        {(onContextMenu) => (
          <Component
            onContextMenu={onContextMenu}
            {...props}
          />
        )}
      </ContextMenu>
    );
  };

  ContextMenuImplementation.propTypes = {
    id: PropTypes.string.isRequired,
  };

  return ContextMenuImplementation;
};

export default withContextMenuFolder;
