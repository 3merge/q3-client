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
} from '@material-ui/core';
import { invoke } from 'lodash';
import {
  Close,
  Check,
  Link as LinkIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {},
}));

const MediaAttributes = ({ quillElement, next }) => {
  const ref = React.useRef();
  const [anchor, setAnchor] = React.useState();

  React.useEffect(() => {
    if (quillElement?.parentNode)
      setAnchor(
        invoke(
          quillElement?.parentNode,
          'getAttribute',
          'href',
        ),
      );
  }, [quillElement?.parentNode]);

  const [href, setHref] = React.useState();

  const handleOnClick = (e) => setAnchor(e.target);

  const handleClose = () => setAnchor(null);

  const linkMedia = () => {
    const wrapper = document.createElement('a');
    wrapper.setAttribute('href', href);
    quillElement.parentNode.insertBefore(
      wrapper,
      quillElement,
    );

    wrapper.appendChild(quillElement);
    setAnchor(null);
    next();
  };

  const handleOnChange = (e) => setHref(e?.target?.value);

  return (
    <Box ref={ref}>
      <Button
        variant={href ? 'contained' : undefined}
        type="button"
        onClick={handleOnClick}
      >
        <LinkIcon />
      </Button>
      <Popover
        anchorEl={anchor}
        containerEl={ref.current}
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
          <TextField
            label="Alt"
            name="alt"
            autoFocus
            value={href}
            onChange={handleOnChange}
            size="small"
            fullWidth
          />

          <IconButton
            size="small"
            type="button"
            onClick={linkMedia}
          >
            <Check />
          </IconButton>
        </Box>
      </Popover>
    </Box>
  );
};

export default MediaAttributes;
