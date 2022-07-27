import React from 'react';
import { Box, Fade } from '@material-ui/core';
import DirectoryMoveTo from '../DirectoryMoveTo';
import DirectoryDeleteFolder from '../DirectoryDeleteFolder';
import FileManagerBatchContext from '../FileManagerBatchContext';
import DialogAbout from '../DialogAbout';
import DialogDelete from '../DialogDelete';
import DialogMoveTo from '../DialogMoveTo';
import DialogRename from '../DialogRename';

const DirectoryToolbar = () => {
  const { sizeOfSelected } = React.useContext(
    FileManagerBatchContext,
  );

  return React.useMemo(
    () => (
      <Box className="q3-context-menu" width="100%">
        <Fade in={sizeOfSelected > 0}>
          <Box display="flex" flexWrap="nowrap">
            <DirectoryMoveTo />
            <DirectoryDeleteFolder />
          </Box>
        </Fade>
        <DialogRename />
        <DialogMoveTo />
        <DialogAbout />
        <DialogDelete />
      </Box>
    ),
    [sizeOfSelected],
  );
};

export default DirectoryToolbar;
