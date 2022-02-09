import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Fade,
} from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { isFunction } from 'lodash';
import { makeStyles } from '@material-ui/core';
import {
  Calendar,
  TableActions,
  Table,
} from '../containers';
import CollectionName from '../components/CollectionName';

const useStyle = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      minHeight: 95,
    },
  },
}));

const UndefinedListElement = () => (
  <div>Missing UI configuration</div>
);

export default (forwardedProps) => (props) => {
  // eslint-disable-next-line
  const { ui } = forwardedProps;
  const cls = useStyle();

  const ListElement = React.useMemo(() => {
    if (!ui || ui === 'table') return Table;
    if (ui === 'calendar') return Calendar;
    if (isFunction(ui))
      return ui({
        ...forwardedProps,
        ...props,
      });

    return UndefinedListElement;
  }, [ui]);

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
                <TableActions
                  {...forwardedProps}
                  {...props}
                />
              </Box>
            </Toolbar>
          </AppBar>
          <ListElement {...forwardedProps} {...props} />
        </Exports>
      </Box>
    </Fade>
  );
};
