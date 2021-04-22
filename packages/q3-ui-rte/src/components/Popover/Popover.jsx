import React from 'react';
import {
  Box,
  Popover as MuiPopover,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { isFunction } from 'lodash';

const Popover = ({ button: Button, children }) => {
  const [anchor, setAnchor] = React.useState();

  const handleOpen = (e) => {
    setAnchor(e?.currentTarget || e?.target);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box>
      <Button onClick={handleOpen} />
      <MuiPopover
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <Box p={2} width={310} position="relative">
          <Box
            position="absolute"
            top={0}
            right={0}
            p={0.5}
            zIndex={1}
          >
            <IconButton size="small" onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          {isFunction(children)
            ? children(handleClose)
            : children}
        </Box>
      </MuiPopover>
    </Box>
  );
};

export default Popover;
