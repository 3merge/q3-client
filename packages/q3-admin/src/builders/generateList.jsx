import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Fade,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
// eslint-disable-next-line
import Exports from 'q3-ui-exports';
import { TableActions, Table } from '../containers';
import { Definitions } from '../containers/state';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const { t } = useTranslation('titles');

  // center on mobile.
  return (
    <Box py={1}>
      <Typography component="h1" variant="h5">
        {t(collectionName)}
      </Typography>
    </Box>
  );
};

export default (forwardedProps) => (props) =>
  (
    <Fade in>
      <Box>
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
