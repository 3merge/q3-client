import React from 'react';
import Grid from '@material-ui/core/Grid';
import CloudDownload from '@material-ui/icons/CloudDownload';
import CloudUpload from '@material-ui/icons/CloudUpload';
import IconButton from '../../../iconButton';

const Bulk = ({ children }) => (
  <Grid container spacing={1}>
    <Grid item style={{ flex: 1 }}>
      {children}
    </Grid>
    <Grid item>
      <IconButton label="import" icon={CloudUpload} />
      <IconButton label="export" icon={CloudDownload} />
    </Grid>
  </Grid>
);

export default Bulk;
