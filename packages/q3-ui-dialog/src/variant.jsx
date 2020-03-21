import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const getPaperWidth = (isLaptop) =>
  isLaptop ? '725px' : '100%';

const getPaperProps = (style) => ({
  anchor: 'right',
  PaperProps: {
    style,
  },
});

const getModalProps = (rest) => ({
  fullWidth: true,
  maxWidth: 'md',
  ...rest,
});

const DialogVariant = ({
  children,
  isOpen,
  onExit,
  onClose,
  onOpen,
  variant,
  ...rest
}) => {
  const El = variant === 'drawer' ? Drawer : Dialog;
  const isLaptop = useMediaQuery('(min-width:867px)');

  const getMobileProps = () =>
    variant === 'drawer'
      ? getPaperProps({
          width: getPaperWidth(isLaptop),
        })
      : getModalProps({
          fullScreen: !isLaptop,
        });

  return React.createElement(
    El,
    {
      onClose,
      open: isOpen,
      onExited: onExit,
      ...getMobileProps(),
      ...rest,
    },
    children,
  );
};

DialogVariant.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['drawer', 'modal']),
};

DialogVariant.defaultProps = {
  variant: 'modal',
};

export default DialogVariant;
