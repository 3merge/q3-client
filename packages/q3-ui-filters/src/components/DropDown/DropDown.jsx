import React from 'react';
import PropTypes from 'prop-types';
import { size } from 'lodash';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import { useOpen } from 'useful-state';

const DropDown = ({ children, applied, name }) => {
  const { open, isOpen, close, anchorEl } = useOpen();

  const getApplied = () =>
    Array.isArray(applied) ? size(applied) : 1;

  return (
    <Box>
      <Chip
        color={isOpen ? 'primary' : undefined}
        label={
          applied
            ? `${name} (${getApplied()})`
            : `Any ${name}`
        }
        onClick={open}
      />
      <Popover
        disablePortal
        keepMounted
        onClose={close}
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper>
          <Box p={1}>{children}</Box>
        </Paper>
      </Popover>
    </Box>
  );
};

export default DropDown;
