import React from 'react';
import {
  Box,
  Popover as MuiPopover,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { isFunction } from 'lodash';
import { useToggle } from 'useful-state';
import useStyle from '../useStyle';

const Popover = ({ button: Button, children }) => {
  const ref = React.useRef();
  const { popover: classes } = useStyle();
  const { state, open, close } = useToggle();

  return (
    <Box ref={ref}>
      <Button onClick={open} />
      <MuiPopover
        anchorEl={ref.current}
        open={state}
        onClose={close}
        classes={{ paper: classes }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2} width={310} position="relative">
          <Box
            position="absolute"
            top={0}
            right={0}
            p={0.5}
            zIndex={1}
          >
            <IconButton size="small" onClick={close}>
              <Close />
            </IconButton>
          </Box>
          {isFunction(children)
            ? children(close)
            : children}
        </Box>
      </MuiPopover>
    </Box>
  );
};

export default Popover;
