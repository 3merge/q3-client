import React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AlarmIcon from '@material-ui/icons/Alarm';
import { useHeader } from 'q3-hooked';
import * as Back from '../../Back';

const StatusWithActions = ({ actions }) => {
  const { updatedBy, status } = useHeader();
  return (
    <Box my={1} role="toolbar">
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid item>
          <Back.Button />
          {/** <Chip label="Key status" /> */}
        </Grid>
        <Grid item>
          <Typography
            color="grey.700"
            component="small"
            style={{ fontSize: '.833rem' }}
          >
            {updatedBy}
          </Typography>

          {Array.isArray(actions)
            ? actions.map((action) => {
                const El =
                  typeof action === 'function'
                    ? action
                    : null;

                return El ? (
                  <El />
                ) : (
                  <IconButton
                    aria-label={action.label}
                    key={action.label}
                    onClick={action.onClick}
                  >
                    <action.Icon />
                  </IconButton>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusWithActions;
