import React from 'react';
import PropTypes from 'prop-types';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import IconButton from 'q3-ui/lib/iconButton';
import Box from '@material-ui/core/Box';
import DrawerMui from '@material-ui/core/Drawer';
import DrawerBody from '../DrawerBody';
import DrawerFooter from '../DrawerFooter';
import DrawerHeader from '../DrawerHeader';
import useStyle from './useStyle';

const Drawer = ({
  isOpen,
  close,
  shopPath,
  checkoutPath,
  children,
  ...rest
}) => {
  const { root } = useStyle();
  return (
    <DrawerMui open={isOpen} anchor="right" onClose={close}>
      <DrawerHeader {...rest}>
        <IconButton
          icon={KeyboardBackspace}
          label="close"
          buttonProps={{
            onClick: close,
            color: 'primary',
          }}
        />
      </DrawerHeader>
      <Box className={root}>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter
          checkoutPath={checkoutPath}
          shopPath={shopPath}
          close={close}
        />
      </Box>
    </DrawerMui>
  );
};

Drawer.propTypes = {
  /**
   * Callback for closing the drawer.
   */
  close: PropTypes.func.isRequired,

  /**
   * Relative URL to checkout page.
   */
  checkoutPath: PropTypes.string.isRequired,

  /**
   * Relative URL to products page.
   */
  shopPath: PropTypes.string.isRequired,

  /**
   * Should drawer items be visible?
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * The drawer items to render.
   */
  children: PropTypes.node.isRequired,
};

export default Drawer;
