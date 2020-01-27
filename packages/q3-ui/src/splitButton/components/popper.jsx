import React from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'useful-state';
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper as PopperMui,
} from '@material-ui/core';

const Popper = ({
  id,
  innerRef,
  renderInside,
  renderOutside,
}) => {
  const { open, close, toggle } = useToggle();

  return (
    <>
      {renderOutside(toggle, open)}
      <PopperMui
        open={open}
        anchorEl={innerRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <Paper id={id} elevation={5}>
              <ClickAwayListener onClickAway={close}>
                {renderInside({ handleClose: close })}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </PopperMui>
    </>
  );
};

Popper.propTypes = {
  /**
   * DOM element ID of the popper container.
   */
  id: PropTypes.string.isRequired,

  /**
   * Ref to assign open state value.
   */
  innerRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,

  /**
   * Renderer that receives "handleClose" callback.
   */
  renderInside: PropTypes.func.isRequired,

  /**
   * Referener function that receives "handleToggle" callback and "open" state/
   */
  renderOutside: PropTypes.func.isRequired,
};

export default Popper;
