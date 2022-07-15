import React from 'react';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import DialogRename from '../DialogRename';
import { withQueryParamIds } from '../utils';

const DialogRenameFolder = () => {
  const { patch } = React.useContext(FileManagerContext);
  const { selected } = React.useContext(
    FileManagerBatchContext,
  );

  return (
    <DialogRename
      renameId="folder"
      handleSubmit={(values, data) =>
        patch(withQueryParamIds(selected))({
          folder: data.path
            .split('/')
            .splice(0, -1)
            .concat(values.name)
            .join('/'),
          replace: true,
        })
      }
    />
  );
};

export default React.memo(DialogRenameFolder);
