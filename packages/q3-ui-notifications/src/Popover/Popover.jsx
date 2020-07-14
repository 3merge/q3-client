import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MuiPopover from '@material-ui/core/Popover';
import { useToggle } from 'useful-state';

const Popover = ({
  anchorComponent,
  defaultValue,
  children,
}) => {
  const anchorEl = React.useRef();
  const { toggle, state, close } = useToggle(defaultValue);

  return (
    <Box display="inline-block">
      {React.cloneElement(anchorComponent, {
        ref: anchorEl,
        onClick: toggle,
        isOpen: state,
      })}
      <MuiPopover
        open={state}
        anchorEl={anchorEl.current}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </MuiPopover>
    </Box>
  );
};

Popover.propTypes = {
  anchorComponent: PropTypes.node.isRequired,
  defaultValue: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

Popover.defaultProps = {
  defaultValue: false,
};

export default Popover;
