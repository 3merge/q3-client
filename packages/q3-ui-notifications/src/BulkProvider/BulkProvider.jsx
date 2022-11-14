import React from 'react';
import {
  Box,
  Paper,
  Grid,
  IconButton,
} from '@material-ui/core';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import DraftsIcon from '@material-ui/icons/Drafts';
import useBulk from '../useBulk';
import BulkContext from '../BulkContext';

const BulkProvider = ({
  children,
  bulkArchiveByIds,
  bulkReadByIds,
  //  bulkRemoveByIds,
  bulkUnarchiveByIds,
  bulkUnreadByIds,
  messageType,
  view,
}) => {
  const { count, state, reset, ...rest } = useBulk();
  const handleClick = (fn) => () => fn(state);

  React.useEffect(() => {
    reset();
  }, [messageType, view]);

  return (
    <BulkContext.Provider value={rest}>
      {count > 0 && (
        <Box position="sticky" top="1rem" zIndex={2} mt={1}>
          <Paper>
            <Box px={1.5} py={1}>
              <Grid
                alignItems="center"
                container
                spacing={1}
              >
                <Grid item>
                  <Box component="span" mr={1}>
                    {count} selected:
                  </Box>
                </Grid>
                {(view === 'unread' || view === 'all') && (
                  <Grid item>
                    <IconButton
                      color="inherit"
                      onClick={handleClick(bulkReadByIds)}
                    >
                      <MarkunreadIcon />
                    </IconButton>
                  </Grid>
                )}
                {view === 'all' && (
                  <Grid item>
                    <IconButton
                      color="inherit"
                      onClick={handleClick(bulkUnreadByIds)}
                    >
                      <DraftsIcon />
                    </IconButton>
                  </Grid>
                )}
                {(view === 'unread' || view === 'all') && (
                  <Grid item>
                    <IconButton
                      color="inherit"
                      onClick={handleClick(
                        bulkArchiveByIds,
                      )}
                    >
                      <ArchiveIcon />
                    </IconButton>
                  </Grid>
                )}
                {view === 'archived' && (
                  <Grid item>
                    <IconButton
                      color="inherit"
                      onClick={handleClick(
                        bulkUnarchiveByIds,
                      )}
                    >
                      <UnarchiveIcon />
                    </IconButton>
                  </Grid>
                )}
                {view === 'archived' && (
                  <Grid item>
                    <IconButton color="inherit">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
        </Box>
      )}
      {children}
    </BulkContext.Provider>
  );
};

export default BulkProvider;
