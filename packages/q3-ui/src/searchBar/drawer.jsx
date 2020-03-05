import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';

const SearchDrawer = ({ state, open, close, children }) => (
  <Drawer
    anchor="right"
    open={state}
    onOpen={open}
    onClose={close}
    component="aside"
  >
    <Box
      p={2}
      width={450}
      style={{
        height: '100%',
        overflowY: 'scroll',
        maxWidth: '90vw',
      }}
    >
      {children}
    </Box>
  </Drawer>
);

SearchDrawer.propTypes = {
  /**
   * The initial open state of the drawer.
   */
  state: PropTypes.bool.isRequired,

  /**
   * Callback onOpen event.
   */
  open: PropTypes.bool.isRequired,

  /**
   * Callback onClose event.
   */
  close: PropTypes.bool.isRequired,

  /**
   * Render inside search drawer panel.
   */
  children: PropTypes.node.isRequired,
};

export default SearchDrawer;
