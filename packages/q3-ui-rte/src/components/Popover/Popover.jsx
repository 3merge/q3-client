import React from 'react';
import {
  Box,
  Popover as MuiPopover,
  IconButton,
  Dialog,
  DialogContent,
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

  const renderInnerModal = () => (
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
  );

  return (
    <Box ref={ref}>
      <Button onClick={open} />
      {matches ? (
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
            {renderInnerModal()}
          </Box>
        </MuiPopover>
      ) : (
        <Dialog
          fullWidth
          maxWidth="lg"
          open={state}
          onClose={close}
        >
          <DialogContent>
            {renderInnerModal()}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Popover;
