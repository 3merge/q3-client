import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Button,
  IconButton,
  Hidden,
} from '@material-ui/core';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import DraftsIcon from '@material-ui/icons/Drafts';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import { size } from 'lodash';
import Confirm from 'q3-ui-confirm';
import BulkContext from '../BulkContext';
import useBulk from '../useBulk';

const BulkProvider = ({
  children,
  bulkArchiveByIds,
  bulkReadByIds,
  //  bulkRemoveByIds,
  bulkUnarchiveByIds,
  bulkUnreadByIds,
  ids,
  messageType,
  view,
  bulkRemoveByIds,
}) => {
  const { all, count, state, reset, ...rest } = useBulk();
  const handleClick = (fn) => () => fn(state);

  React.useEffect(() => {
    reset();
  }, [messageType, view]);

  return (
    <BulkContext.Provider value={rest}>
      {size(ids) > 0 && (
        <Hidden smDown>
          <Box
            position="absolute"
            top={0}
            right={0}
            className="notifications-bulk-buttons"
          >
            {count ? (
              <Button
                color="inherit"
                onClick={reset}
                startIcon={<ClearIcon />}
              >
                Unselect all
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  all(ids);
                }}
                startIcon={<DoneAllIcon />}
              >
                Select all
              </Button>
            )}
          </Box>
        </Hidden>
      )}
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
                      <DraftsIcon />
                    </IconButton>
                  </Grid>
                )}
                {view === 'all' && (
                  <Grid item>
                    <IconButton
                      color="inherit"
                      onClick={handleClick(bulkUnreadByIds)}
                    >
                      <MarkunreadIcon />
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
                    <Confirm
                      title="confirm"
                      description="confirm"
                      service={handleClick(bulkRemoveByIds)}
                      label="addToTrash"
                      phrase="DELETE"
                      // eslint-disable-next-line
                      ButtonComponent={({ onClick }) => (
                        <IconButton
                          onClick={onClick}
                          color="inherit"
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      )}
                    />
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
