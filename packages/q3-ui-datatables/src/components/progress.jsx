import React from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { red, green, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const ColorLinearProgress = withStyles({
  barColorPrimary: {
    backgroundColor: ({ value }) => {
      if (value < 10) return red[500];
      if (value < 50) return blue[500];
      return green[500];
    },
  },
})(LinearProgress);

const Progress = (props) => (
  <Box display="inline-block" width="75px">
    <ColorLinearProgress
      {...props}
      variant="buffer"
      valueBuffer={100}
      width={75}
    />
  </Box>
);
export default Progress;
