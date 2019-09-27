import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { Components } from 'q3-ui';

const useStyles = makeStyles(() => ({
  bg: {
    background: grey[200],
  },
  foreground: {
    filter: 'initial',
    mixBlendMode: 'multiply',
    maxWidth: 500,
  },
}));

export default () => {
  const { foreground, bg } = useStyles();

  return (
    <Box className={bg} textAlign="center">
      <Components.MissingGraphic className={foreground} />
    </Box>
  );
};
