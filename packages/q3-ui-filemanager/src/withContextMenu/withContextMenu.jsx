import React from 'react';
import PropTypes from 'prop-types';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import HelpIcon from '@material-ui/icons/Help';
import ContextMenu from '../ContextMenu';
import useDialog from '../useDialog';
import useSaveAs from '../useSaveAs';
import { DIALOG_ABOUT, DIALOG_DELETE } from '../constants';
import { DIALOG_MOVE, DIALOG_RENAME } from '../constants';

export const useCurriedDialog = (props) => (dialogId) =>
  useDialog(dialogId, props).open;

const withContextMenu = (Component) => {
  const ContextMenuImplementation = (props) => {
    const { id, onClick } = props;
    const save = useSaveAs(props);

    const [
      openAboutDialog,
      openDeleteDialog,
      openMoveTo,
      openRenameDialog,
    ] = [
      DIALOG_ABOUT,
      DIALOG_DELETE,
      DIALOG_MOVE,
      DIALOG_RENAME,
    ].map(useCurriedDialog(props));

    return (
      <ContextMenu
        id={id}
        items={[
          {
            icon: <HelpIcon />,
            label: 'about',
            onClick: openAboutDialog,
          },
          {
            icon: <VisibilityIcon />,
            label: 'preview',
            onClick,
          },
          {
            icon: <GetAppIcon />,
            label: 'download',
            onClick: save,
          },
          {
            divider: true,
          },
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
            divider: true,
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
    onClick: PropTypes.func.isRequired,
  };

  return ContextMenuImplementation;
};

export default withContextMenu;
