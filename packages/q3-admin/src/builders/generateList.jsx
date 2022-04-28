import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Fade,
} from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { makeStyles } from '@material-ui/core';
import { TableActions } from '../containers';
import CollectionName from '../components/CollectionName';
import CollectionUiResolver from '../components/CollectionUiResolver';

const useStyle = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
  },
}));

export default (forwardedProps) => (props) => {
  const cls = useStyle();
  const settledProps = {
    ...forwardedProps,
    ...props,
  };

  return (
    <Fade in>
      <Box height="100%">
        <Exports>
          <AppBar
            elevation={0}
            color="inherit"
            position="static"
          >
            <Toolbar className={cls.toolbar}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <CollectionName />
                <TableActions {...settledProps} />
              </Box>
            </Toolbar>
          </AppBar>
          <CollectionUiResolver {...settledProps} />
        </Exports>
      </Box>
    </Fade>
  );
};
