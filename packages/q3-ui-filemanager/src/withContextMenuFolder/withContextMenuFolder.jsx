import React from 'react';
import PropTypes from 'prop-types';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ContextMenu from '../ContextMenu';
import {
  DIALOG_DELETE,
  DIALOG_MOVE,
  DIALOG_RENAME,
} from '../constants';
import { useCurriedDialog } from '../withContextMenu/withContextMenu';

const withContextMenuFolder = (Component) => {
  const ContextMenuImplementation = (props) => {
    const { id } = props;

    const [openDeleteDialog, openMoveTo, openRenameDialog] =
      [DIALOG_DELETE, DIALOG_MOVE, DIALOG_RENAME].map(
        useCurriedDialog(props),
      );

    return (
      <ContextMenu
        id={id}
        items={[
          {
            auth: 'canEdit',
            icon: <EditIcon />,
            label: 'rename',
            onClick: openRenameDialog,
          },
          {
            auth: 'canEdit',
            icon: <AccountTreeIcon />,
            label: 'moveTo',
            onClick: openMoveTo,
          },
          {
            auth: 'canDelete',
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
