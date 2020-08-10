import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import FileName from '../FileName';

const getApproximateSize = (num) => {
  const kb = Math.floor(num / 1000);
  const mb = Math.floor(num / 1000000);

  return `~${kb > 1000 ? `${mb}MB` : `${kb}KB`}`;
};

const FilePending = ({ name, size, type, ...etc }) => {
  return (
    <Box
      justifyContent="space-between"
      display="flex"
      padding={0.5}
      width="100%"
    >
      <FileName {...etc} name={name} />
      <Box alignItems="center" display="flex">
        <LinearProgress style={{ width: 85 }} />
        <Box
          alignItems="center"
          component="span"
          display="flex"
          ml={0.5}
          style={{
            fontSize: '.711rem',
            textTransform: 'uppercase',
          }}
        >
          {getApproximateSize(size)}
        </Box>
      </Box>
    </Box>
  );
};

export default FilePending;
