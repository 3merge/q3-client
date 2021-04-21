import React from 'react';
import {
  Box,
  Popover,
  IconButton,
  TextField,
} from '@material-ui/core';
import {
  Link as LinkIcon,
  Close,
  Check,
} from '@material-ui/icons';
import { invoke, isObject, size } from 'lodash';
import Quill from 'quill';

const ModuleLink = React.forwardRef((props, ref) => {
  const containerRef = React.useRef();
  const [anchor, setAnchor] = React.useState();

  const [state, setState] = React.useState();
  const [selection, setSelection] = React.useState();

  const handleClick = (e) => {
    const quill = ref?.current;
    setSelection(invoke(quill, 'getSelection'));
    setAnchor(e?.target);
  };

  const handleSubmit = () => {
    const quill = ref?.current;
    if (!isObject(selection) || !size(state)) return;
    quill.format('link', state, Quill.sources.USER);
    setAnchor(null);

    quill.update();
    quill.focus();
    quill.setSelection(selection);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box ref={containerRef}>
      <IconButton type="button" onClick={handleClick}>
        <LinkIcon />
      </IconButton>
      <Popover
        disablePortal
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
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
            <IconButton size="small" onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          {isObject(selection) ? (
            <>
              <TextField
                label="LINK"
                name="href"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                size="small"
                fullWidth
              />

              <IconButton
                size="small"
                type="button"
                onClick={handleSubmit}
              >
                <Check />
              </IconButton>
            </>
          ) : (
            'No selection'
          )}
        </Box>
      </Popover>
    </Box>
  );
});

export default ModuleLink;
