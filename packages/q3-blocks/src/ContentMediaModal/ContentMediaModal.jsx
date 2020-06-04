import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import IconButton from 'q3-ui/lib/iconButton';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { useToggle } from 'useful-state';

const ContentMediaModal = ({ title, media, children }) => {
  const { toggle, state } = useToggle();

  return (
    <>
      <Dialog
        onClose={toggle}
        aria-labelledby={title}
        maxWidth="md"
        fullWidth
        open={state}
      >
        {media}
        <Box position="absolute" top="1rem" right="1rem">
          <IconButton
            label="close"
            icon={Close}
            buttonProps={{
              onClick: toggle,
              style: { color: '#FFF' },
            }}
          />
        </Box>
      </Dialog>
      {children(toggle)}
    </>
  );
};

ContentMediaModal.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default ContentMediaModal;
