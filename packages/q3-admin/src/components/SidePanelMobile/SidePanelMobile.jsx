import React from 'react';
import PropTypes from 'prop-types';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import Dialog from 'q3-ui-dialog';
import { Box, Hidden, IconButton } from '@material-ui/core';
import withActionPortal from '../withActionPortal';

const SidePanelMobile = ({ children }) => (
  <Hidden lgUp>
    <Dialog
      title="options"
      renderContent={() => children}
      renderTrigger={(onClick) => (
        <Box>
          <IconButton
            aria-label="options"
            onClick={onClick}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      )}
    />
  </Hidden>
);

SidePanelMobile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
};

export default withActionPortal(SidePanelMobile);
