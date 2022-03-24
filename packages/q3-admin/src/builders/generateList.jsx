import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Fade,
} from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { map, isFunction, size, find } from 'lodash';
import { makeStyles } from '@material-ui/core';
import useCollectionUiLocalStorage from '../hooks/useCollectionUiLocalStorage';
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
  const { ui, uis = [] } = forwardedProps;
  const cls = useStyle();

  const { cached, change } = useCollectionUiLocalStorage(
    size(uis) ? uis[0]?.ui : ui,
    [map(uis, 'ui'), ui],
  );

  const [settledUi, setSettledUi] = React.useState(cached);

  const settledProps = {
    ...forwardedProps,
    ...find(uis, (uix) => uix.ui === settledUi),
    ...props,
  };

  const ListElement = React.useMemo(() => {
    if (!settledUi || settledUi === 'table') return Table;
    if (settledUi === 'calendar') return Calendar;
    if (isFunction(settledUi))
      return settledUi(settledProps);

    return UndefinedListElement;
  }, [settledUi]);

  React.useEffect(() => {
    change(settledUi);
  }, [settledUi]);

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
                  {...settledProps}
                  uis={map(uis, (item) => ({
                    label: item.ui,
                    onClick: () => setSettledUi(item.ui),
                    selected: item.ui === settledUi,
                  }))}
                />
              </Box>
            </Toolbar>
          </AppBar>
          <ListElement {...settledProps} />
        </Exports>
      </Box>
    </Fade>
  );
};
