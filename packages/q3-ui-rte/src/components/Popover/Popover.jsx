import React from 'react';
import {
  Box,
  Popover as MuiPopover,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useToggle } from 'useful-state';
import PopoverSave from '../PopoverSave';
import PopoverTextField from '../PopoverTextField';
import useStyle from '../useStyle';

const Popover = ({ button: Button, onSave, ...rest }) => {
  const ref = React.useRef();
  const { popover: classes } = useStyle();
  const { state, open, close } = useToggle();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleOpen = () =>
    // eslint-disable-next-line
    matches ? open() : onSave(prompt());

  return (
    <Box ref={ref}>
      <Button onClick={handleOpen} />
      <MuiPopover
        disablePortal
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
          <PopoverTextField {...rest}>
            {(textFieldState) => (
              <PopoverSave
                onClick={(e) => {
                  e.preventDefault();
                  onSave(textFieldState);
                  close();
                }}
              />
            )}
          </PopoverTextField>
        </Box>
      </MuiPopover>
    </Box>
  );
};

export default Popover;
