import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';
import FileName from '../FileName';
import FileExtensions from '../FileExtensions';

const getApproximateSize = (num) => {
  const roundDown = (v) => Math.floor(num / v);
  const kb = roundDown(1000);
  const mb = roundDown(1000000);
  return `~${kb > 1000 ? `${mb}MB` : `${kb}KB`}`;
};

const FilePending = ({
  id,
  name,
  size,
  type,
  url,
  error,
  onDelete,
  ...etc
}) => {
  const renderAction = () => {
    if (error)
      return (
        <Avatar style={{ background: 'transparent' }}>
          <WarningIcon style={{ color: red[900] }} />
        </Avatar>
      );

    if (!url)
      return (
        <Box alignItems="center" display="flex">
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
      <IconButton onClick={onDelete(id)}>
        <TrashIcon />
      </IconButton>
    );
  };

  const Icon = () => {
    const [, ext] = name.split('.');
    const icon = FileExtensions.getIcon(ext);
    // OPENS larger on IMAGE or downloads on CLick..
    // Right click to delete or download
    return ['png', 'jpeg', 'jpg'].includes(ext) ? (
      <img
        alt={name}
        src={url}
        style={{ height: '3rem' }}
      />
    ) : (
      React.cloneElement(icon, {
        style: {
          fontSize: '3rem',
        },
      })
    );
  };

  return (
    <Grid item>
      <Icon />
    </Grid>
  );
};

export default FilePending;
