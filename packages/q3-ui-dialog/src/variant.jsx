import React from 'react';
import PropTypes from 'prop-types';
import { get, merge, pick } from 'lodash';
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
  const isLaptop = useMediaQuery((theme) =>
    theme.breakpoints.up('lg'),
  );

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
          ...get(rest, 'ModalProps', {}),
          onClose,
          open: isOpen,
          onExited: onExit,
          maxWidth: 'sm',
        };

  return (
    <El
      {...merge(
        {},
        getMobileProps(),
        asModal(),
        pick(rest, [
          'anchor',
          'classes',
          'className',
          'keepMounted',
          'ModalProps',
          'PaperComponent',
          'PaperProps',
          'SlideProps',
          'TransitionProps',
        ]),
      )}
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
