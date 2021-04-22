import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@material-ui/core';
import { invoke, set, isObject } from 'lodash';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { FloatIcon } from '../../assets';
import MediaAltTag from '../MediaAltTag';

const MediaAttributes = ({ imageEl }) => {
  const handleReset = () => {
    set(imageEl, 'style', {});
    invoke(imageEl, 'setAttribute', 'alt', '');
  };

  const handleStyleChange = (styles) => () => {
    if (!isObject(styles)) return;
    Object.entries(styles).forEach(([key, value]) => {
      set(imageEl, `style.${key}`, value);
    });
  };

  const makeFullWidth = handleStyleChange({
    float: 'none',
    margin: '1rem auto',
    width: '100%',
  });

  const makeHalfWidth = handleStyleChange({
    float: 'none',
    margin: '1rem auto',
    width: '50%',
  });

  const makeFloat = handleStyleChange({
    float: 'left',
    margin: '0',
    width: '33%',
  });

  return (
    <>
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        position="absolute"
        p={0.5}
        m={0.5}
      >
        <Grid container spacing={1}>
          <Grid item>
            <IconButton
              color="inherit"
              type="button"
              onClick={makeFloat}
            >
              <FloatIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              type="button"
              color="inherit"
              onClick={makeHalfWidth}
            >
              <CalendarViewDayIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              type="button"
              color="inherit"
              onClick={makeFullWidth}
            >
              <ViewDayIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <MediaAltTag ref={{ current: imageEl }} />
          </Grid>
          <Grid item>
            <IconButton
              type="button"
              color="inherit"
              onClick={handleReset}
            >
              <RotateLeftIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MediaAttributes;
