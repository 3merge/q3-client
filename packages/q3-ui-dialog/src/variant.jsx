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
  const isDrawer = variant === 'drawer';
  const El = isDrawer ? Drawer : Dialog;
  const isLaptop = useMediaQuery('(min-width:1040px)');

  const getMobileProps = () =>
    isDrawer
      ? getPaperProps({
          width: getPaperWidth(isLaptop),
        })
      : getModalProps({
          fullScreen: !isLaptop,
        });

  const asModal = () =>
    isDrawer
      ? {
          open: isOpen,
          onClose: () => {
            try {
              onClose();
              onExit();
            } catch (e) {
              // noop
            }
          },
        }
      : {
          onClose,
          open: isOpen,
          onExited: onExit,
        };

  return (
    <El
      {...{
        ...getMobileProps(),
        ...asModal(),
        ...rest,
      }}
    >
      <div>{children}</div>
    </El>
  );
};

DialogVariant.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['drawer', 'modal']),
};

DialogVariant.defaultProps = {
  variant: 'modal',
  onExit: null,
};

export default DialogVariant;
