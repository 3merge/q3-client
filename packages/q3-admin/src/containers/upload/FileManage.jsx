import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Trash from '@material-ui/icons/DeleteForever';

const FileManage = ({ remove, view }) => (
  <Box display="flex">
    <IconButton size="small" component="a" href={view}>
      <CloudDownload />
    </IconButton>
    <IconButton size="small" onClick={remove}>
      <Trash />
    </IconButton>
  </Box>
);

export default FileManage;
