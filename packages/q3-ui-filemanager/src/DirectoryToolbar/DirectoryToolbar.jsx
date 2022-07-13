import React from 'react';
import { Box, IconButton, Fade } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DirectoryDeleteFolder from '../DirectoryDeleteFolder';
import FileManagerBatchContext from '../FileManagerBatchContext';

const DirectoryToolbar = ({ openMoveTo }) => {
  const { sizeOfSelected } = React.useContext(
    FileManagerBatchContext,
  );

  return (
    <Fade in={sizeOfSelected > 0}>
      <Box className="q3-context-menu" width="100%">
        <IconButton color="inherit" onClick={openMoveTo}>
          <AccountTreeIcon />
        </IconButton>
        <DirectoryDeleteFolder />
      </Box>
    </Fade>
  );
};

export default DirectoryToolbar;
