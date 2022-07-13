import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from 'q3-ui-confirm';
import FileManagerBatchContext from '../FileManagerBatchContext';
import FileManagerContext from '../FileManagerContext';
import { withQueryParamIds } from '../utils';

const DirectoryDeleteFolder = () => {
  const { poll, remove } = React.useContext(
    FileManagerContext,
  );
  const { enable, disable, selected } = React.useContext(
    FileManagerBatchContext,
  );

  return (
    <Confirm
      title="delete"
      icon={DeleteIcon}
      phrase="DELETE"
      service={() =>
        remove(withQueryParamIds(selected))().then(poll)
      }
      TransitionProps={{
        onEnter() {
          disable();
        },
        onExit() {
          enable();
        },
      }}
    />
  );
};

export default DirectoryDeleteFolder;
