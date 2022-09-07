import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Tooltip } from '@material-ui/core';
import useStyle from './styles';

const CellAvatar = ({ children, color, icon: Icon }) => {
  const cls = useStyle({
    backgroundColor: color,
  });

  return (
    <Box display="flex" justifyContent="space-between">
      {!Icon ? (
        <Avatar src={children} />
      ) : (
        <Tooltip arrow title={children}>
          <Avatar className={cls.root}>
            <Icon />
          </Avatar>
        </Tooltip>
      )}
    </Box>
  );
};

CellAvatar.defaultProps = {
  children: null,
  color: undefined,
  icon: null,
};

CellAvatar.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.element,
};

export default CellAvatar;
