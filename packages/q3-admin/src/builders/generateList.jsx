import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Fade,
} from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { isFunction } from 'lodash';
import {
  Calendar,
  TableActions,
  Table,
} from '../containers';
import CollectionName from '../components/CollectionName';

const UndefinedListElement = () => (
  <div>Missing UI configuration</div>
);

export default (forwardedProps) => (props) => {
  // eslint-disable-next-line
  const { ui } = forwardedProps;

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
          <AppBar color="inherit" position="static">
            <Toolbar style={{ minHeight: 95 }}>
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
