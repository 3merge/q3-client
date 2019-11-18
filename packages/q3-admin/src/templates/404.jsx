import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { MissingGraphic } from 'q3-ui/lib/graphic';

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
      <MissingGraphic className={foreground} />
    </Box>
  );
};
