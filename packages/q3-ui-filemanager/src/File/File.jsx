import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';
import { useAuth } from 'q3-ui-permissions';
import FileName from '../FileName';

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
  collectionName,
  disableDelete,
  ...etc
}) => {
  const { HideByField } = useAuth(collectionName);

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
      !disableDelete && (
        <HideByField path="uploads" op="Delete">
          <IconButton onClick={onDelete(id)}>
            <TrashIcon />
          </IconButton>
        </HideByField>
      )
    );
  };

  return (
    <Box
      justifyContent="space-between"
      display="flex"
      width="100%"
    >
      <FileName
        {...etc}
        loading={!url && !error}
        name={name}
        url={url}
      />
      {renderAction()}
    </Box>
  );
};

export default FilePending;
