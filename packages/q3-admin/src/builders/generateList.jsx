import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { TableActions, Table } from '../containers';
import { Definitions } from '../containers/state';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const { t } = useTranslation('titles');

  return (
    <Typography component="h1" variant="h5">
      {t(collectionName)}
    </Typography>
  );
};

export default (forwardedProps) => (props) =>
  (
    <>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <CollectionName />
            <TableActions {...forwardedProps} {...props} />
          </Box>
        </Toolbar>
      </AppBar>
      <Table {...forwardedProps} {...props} />
    </>
  );
