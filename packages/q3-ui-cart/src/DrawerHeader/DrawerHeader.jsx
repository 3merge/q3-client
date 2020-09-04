import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { CartLoadingContext } from '../context';
import DrawerSubtotal from '../DrawerSubtotal';
import DrawerTitle from '../DrawerTitle';
import DrawerTrash from '../DrawerTrash';
import useStyle from './useStyle';

const CartDrawer = ({ children, ...rest }) => {
  const loading = React.useContext(CartLoadingContext);
  const { bar } = useStyle();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={10}
    >
      <Fade in={loading}>
        <LinearProgress />
      </Fade>
      <Toolbar className={bar}>
        <Box display="flex" alignItems="center">
          {children}
          <DrawerTitle {...rest} />
        </Box>
        <Box display="flex" alignItems="center">
          <DrawerSubtotal />
          <DrawerTrash />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

CartDrawer.propTypes = {
  /**
   * Renders beside the title.
   * Intened for a back-button or some other navigational element.
   */
  children: PropTypes.node.isRequired,
};

export default CartDrawer;
