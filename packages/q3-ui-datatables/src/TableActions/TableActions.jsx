import React from 'react';
import {
  Tooltip,
  Grid,
  IconButton,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableActionsDropdown from '../TableActionsDropdown';
import TableActionsDropdownImports from '../TableActionsDropdownImports';

const TableActions = ({
  exportOptions,
  importOptions,
  moreOptions,
}) => (
  <Grid item>
    <Grid container spacing={1}>
      <TableActionsDropdownImports items={importOptions}>
        {(onClick) => (
          <Grid item>
            <IconButton color="inherit" onClick={onClick}>
              <CloudUploadIcon />
            </IconButton>
          </Grid>
        )}
      </TableActionsDropdownImports>
      <TableActionsDropdown items={exportOptions}>
        {(onClick) => (
          <Grid item>
            <IconButton color="inherit" onClick={onClick}>
              <CloudDownloadIcon />
            </IconButton>
          </Grid>
        )}
      </TableActionsDropdown>
      <Grid item>
        <TableActionsDropdown items={moreOptions}>
          {(onClick) => (
            <Grid item>
              <Tooltip title="more">
                <IconButton
                  onClick={onClick}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </TableActionsDropdown>
      </Grid>
    </Grid>
  </Grid>
);

export default TableActions;
