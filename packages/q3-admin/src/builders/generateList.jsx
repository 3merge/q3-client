import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Fade,
} from '@material-ui/core';
// eslint-disable-next-line
import Exports from 'q3-ui-exports';
import { TableActions, Table } from '../containers';
import CollectionName from '../components/CollectionName';

export default (forwardedProps) => (props) =>
  (
    <Fade in>
      <Box height="100%">
        <Exports>
          <AppBar color="inherit" position="static">
            <Toolbar>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <CollectionName />
                <TableActions
                  {...forwardedProps}
                  {...props}
                />
              </Box>
            </Toolbar>
          </AppBar>
          <Table {...forwardedProps} {...props} />
        </Exports>
      </Box>
    </Fade>
  );
