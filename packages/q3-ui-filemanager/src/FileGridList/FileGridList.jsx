import React from 'react';
import { Grid } from '@material-ui/core';
import FolderGrid from '../FileGrid';
import withRenderFile from '../withRenderFile';

export default withRenderFile(
  FolderGrid,
  (directoryNodes, fileNodes) => (
    <Grid container spacing={3}>
      {directoryNodes}
      <Grid container item spacing={3}>
        {fileNodes}
      </Grid>
    </Grid>
  ),
);
