import React from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'useful-state';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import PopperMui from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getPopperStyle } from '../utils';

const Popper = ({
  id,
  innerRef,
  renderInside,
  renderOutside,
}) => {
  const { open, close, toggle, state } = useToggle();

  return (
    <>
      {renderOutside(toggle, open)}
      <PopperMui
        open={state}
        anchorEl={innerRef.current}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              ...getPopperStyle(innerRef, placement),
              minWidth: 250,
            }}
          >
            <Paper id={id} elevation={10}>
              <ClickAwayListener onClickAway={close}>
                <div>{renderInside(close)}</div>
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
