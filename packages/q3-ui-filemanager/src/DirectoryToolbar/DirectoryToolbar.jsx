import React from 'react';
import { Box, Fade } from '@material-ui/core';
import DirectoryMoveTo from '../DirectoryMoveTo';
import DirectoryDeleteFolder from '../DirectoryDeleteFolder';
import FileManagerBatchContext from '../FileManagerBatchContext';
import DialogAbout from '../DialogAbout';
import DialogDelete from '../DialogDelete';
import DialogMoveTo from '../DialogMoveTo';
import DialogRenameFile from '../DialogRenameFile';
import DialogRenameFolder from '../DialogRenameFolder';

const DirectoryToolbar = () => {
  const { sizeOfSelected } = React.useContext(
    FileManagerBatchContext,
  );

  return (
    <Box className="q3-context-menu" width="100%">
      <Fade in={sizeOfSelected > 0}>
        <Box>
          <DirectoryMoveTo />
          <DirectoryDeleteFolder />
        </Box>
      </Fade>
      <DialogRenameFile />
      <DialogRenameFolder />
      <DialogMoveTo />
      <DialogAbout />
      <DialogDelete />
    </Box>
  );
};

export default DirectoryToolbar;
