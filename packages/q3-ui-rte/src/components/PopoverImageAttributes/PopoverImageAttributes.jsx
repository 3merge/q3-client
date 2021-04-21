import React from 'react';
import {
  Button,
  Box,
  Popover,
  TextField,
} from '@material-ui/core';

const RichTextEditor = ({
  containerEl,
  anchorEl,
  removeAnchorEl,
}) => {
  const [state, setState] = React.useState({});

  const handleOnChange = (e) =>
    setState({
      ...state,
      [e?.target?.name]: e?.target?.value,
    });

  return (
    <Popover
      open={Boolean(anchorEl) && Boolean(containerEl)}
      anchorEl={anchorEl}
      onClose={removeAnchorEl}
      container={containerEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2} maxWidth={410}>
        <TextField
          label="Alt attribute"
          name="alt"
          type="text"
          onChange={handleOnChange}
          value={state?.alt}
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
        />
        <TextField
          label="Width"
          type="number"
          name="width"
          value={state?.width}
          onChange={handleOnChange}
          variant="outlined"
          margin="dense"
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => {
            Object.entries(state).forEach(
              ([key, value]) => {
                if (['width'].includes(key))
                  anchorEl[key] = value;
                else anchorEl.setAttribute(key, value);
              },
            );

            removeAnchorEl(null);
          }}
        >
          Done
        </Button>
      </Box>
    </Popover>
  );
};

export default RichTextEditor;
