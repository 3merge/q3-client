import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Popover,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
  NativeSelect,
} from '@material-ui/core';
import { invoke, get } from 'lodash';
import {
  Close,
  DeleteForever,
  EditAttributes,
  Check,
} from '@material-ui/icons';
import ModuleLink from '../ModuleLink';

const useStyles = makeStyles(() => ({
  root: {},
}));

const MediaAttributes = ({
  deleteMedia,
  imageEl,
  editorEl,
}) => {
  const [anchor, setAnchor] = React.useState();
  const [state, setState] = React.useState({
    alt: invoke(imageEl, 'getAttribute', 'alt'),
    width: get(imageEl, 'width', ''),
  });

  const setAltAttribute = () => {
    Object.entries(state).forEach(([key, value]) => {
      if (['float', 'margin'].includes(key)) {
        imageEl.style[key] = value;
      } else imageEl.setAttribute(key, value);
    });

    editorEl.update();
    setAnchor(null);
  };

  const handleOnClick = (e) => setAnchor(e.target);
  const ref = React.useRef();

  const updateState = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  return (
    <Box
      position="absolute"
      p={0.5}
      top="1rem"
      left="1rem"
      ref={ref}
    >
      <Popover
        anchorEl={anchor}
        containerEl={ref.current}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
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
            <IconButton
              size="small"
              onClick={() => setAnchor(null)}
            >
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="Alt"
            name="alt"
            autoFocus
            value={state.alt}
            onChange={updateState}
            size="small"
            fullWidth
          />
          <NativeSelect
            label="Float"
            name="float"
            component="selection"
            autoFocus
            value={state.margin}
            onChange={updateState}
            size="small"
            fullWidth
          >
            <option />
            <option value="none">None</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </NativeSelect>
          <NativeSelect
            label="Margin"
            name="margin"
            component="selection"
            autoFocus
            value={state.margin}
            onChange={updateState}
            size="small"
            fullWidth
          >
            <option />
            <option value="0 auto">Center</option>
            <option value="auto">Left</option>
            <option value="0 0 auto">Right</option>
          </NativeSelect>
          <TextField
            label="Width"
            name="width"
            value={state.width}
            onChange={updateState}
            size="small"
            type="number"
            fullWidth
          />
          <IconButton
            size="small"
            type="button"
            onClick={setAltAttribute}
          >
            <Check />
          </IconButton>
        </Box>
      </Popover>
      <Paper className={useStyles()?.root} elevation={3}>
        <ButtonGroup variant="text" size="large">
          <Button type="button" onClick={deleteMedia}>
            <DeleteForever />
          </Button>
          <ModuleLink
            targetEl={imageEl}
            ref={{ current: editorEl }}
          />
          <Button type="button" onClick={handleOnClick}>
            <EditAttributes />
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
};

export default MediaAttributes;
