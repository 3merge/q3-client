import React from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import saveAs from 'file-saver';
import Exports from 'q3-exports';

const Download = ({ data, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (type) => () =>
    new Exports(type).toBuffer(data).then((buf) => {
      saveAs(
        new Blob([buf]),
        `${String(title)
          .toLowerCase()
          .replace(/\s/g, '-')}.${type}`,
      );
    });

  return (
    <>
      <IconButton onClick={handleClick}>
        <CloudDownloadIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleExport('csv')}
          style={{ margin: 0 }}
        >
          CSV
        </MenuItem>
        <MenuItem
          onClick={handleExport('xlsx')}
          style={{ margin: 0 }}
        >
          Excel Worksheet
        </MenuItem>
      </Menu>
    </>
  );
};

export default Download;
