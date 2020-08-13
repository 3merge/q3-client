import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';
import FileName from '../FileName';

const getApproximateSize = (num) => {
  const kb = Math.floor(num / 1000);
  const mb = Math.floor(num / 1000000);

  return `~${kb > 1000 ? `${mb}MB` : `${kb}KB`}`;
};

const FilePending = ({
  name,
  size,
  type,
  url,
  error,
  ...etc
}) => {
  const renderAction = () => {
    if (error) return <WarningIcon color={red[900]} />;

    if (!url)
      return (
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
      );

    return (
      <IconButton>
        <TrashIcon />
      </IconButton>
    );
  };

  return (
    <Box
      justifyContent="space-between"
      display="flex"
      width="100%"
    >
      <FileName {...etc} name={name} url={url} />
      {renderAction()}
    </Box>
  );
};

export default FilePending;
