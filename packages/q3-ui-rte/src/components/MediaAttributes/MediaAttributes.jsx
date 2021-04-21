import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import Quill from 'quill';

const useStyles = makeStyles(() => ({
  root: {},
}));

const MediaAttributes = ({ deleteMedia }) => {
  return (
    <Box position="absolute" p={0.5} top="1rem" left="1rem">
      <Paper className={useStyles()?.root} elevation={3}>
        <button onClick={deleteMedia}>D</button>
        <button onClick={deleteMedia}>Alt</button>
        <button onClick={deleteMedia}>Link</button>
        <button onClick={deleteMedia}>Width</button>
      </Paper>
    </Box>
  );
};

export default MediaAttributes;
