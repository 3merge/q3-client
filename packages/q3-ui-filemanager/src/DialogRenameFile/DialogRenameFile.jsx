import React from 'react';
import FileManagerContext from '../FileManagerContext';
import DialogRename from '../DialogRename';

const DialogRenameFile = () => {
  const { patch } = React.useContext(FileManagerContext);

  return (
    <DialogRename
      renameId="file"
      handleSubmit={(values, data) =>
        patch(data?.id)(values)
      }
    />
  );
};

export default React.memo(DialogRenameFile);
