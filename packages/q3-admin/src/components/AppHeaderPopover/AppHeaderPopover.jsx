import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import { useToggle } from 'useful-state';
import { withStyles } from '@material-ui/core/styles';

const SuccessBadge = withStyles((theme) => ({
  dot: {
    backgroundColor: theme.palette.success.main,
  },
}))(Badge);

export const AppHeaderPopover = ({
  id,
  children,
  disabled,
  icon: Icon,
  showBadge,
}) => {
  const anchorEl = React.useRef();
  const { toggle, state, close } = useToggle();

  return (
    <Box display="inline-block" p={1}>
      <IconButton
        ref={anchorEl}
        onClick={toggle}
        color="inherit"
        disabled={disabled}
      >
        <SuccessBadge
          variant="dot"
          showZero={showBadge}
          badgeContent={0}
        >
          <Icon />
        </SuccessBadge>
      </IconButton>
      <Popover
        id={id}
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
      </Popover>
    </Box>
  );
};

AppHeaderPopover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  showBadge: PropTypes.bool,
  disabled: PropTypes.bool,
};

AppHeaderPopover.defaultProps = {
  showBadge: false,
  disabled: false,
};

export default AppHeaderPopover;
