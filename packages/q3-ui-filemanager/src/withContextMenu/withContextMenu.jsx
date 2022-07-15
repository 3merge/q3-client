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

const withContextMenu = (Component) => {
  const ContextMenuImplementation = (props) => {
    const { id, onClick } = props;
    const save = useSaveAs(props);

    const { open: openDeleteDialog } = useDialog(
      'q3-file-dialog-delete',
      props,
    );

    const { open: openAboutDialog } = useDialog(
      'q3-file-dialog-about',
      props,
    );

    const { open: openMoveTo } = useDialog(
      'q3-file-dialog-move-to',
      props,
    );

    const { open: openRenameDialog } = useDialog(
      'q3-file-dialog-rename-file',
      props,
    );

    return (
      <ContextMenu
        id={id}
        items={[
          {
            icon: <VisibilityIcon />,
            label: 'preview',
            onClick,
          },
          {
            icon: <GetAppIcon />,
            label: 'dowload',
            onClick: save,
          },
          {
            divider: true,
          },
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
          {
            divider: true,
          },
          {
            icon: <HelpIcon />,
            label: 'about',
            onClick: openAboutDialog,
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
