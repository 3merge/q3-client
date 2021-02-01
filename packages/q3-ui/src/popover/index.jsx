import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MaterialPopover from '@material-ui/core/Popover';
import useStyles from './useStyles';

const Popover = ({
  children,
  popoverChildren,
  PopoverProps = {},
  disablePopover,
}) => {
  if (disablePopover) return children;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const cls = useStyles();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {React.cloneElement(children, {
        'aria-own': open ? 'mouse-over-popover' : undefined,
        'aria-haspopup': open,
        onMouseEnter: handlePopoverOpen,
        onMouseLeave: handlePopoverClose,
      })}
      <MaterialPopover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        className={cls.popover}
        classes={{
          paper: cls.paper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          elevation: 5,
        }}
        {...PopoverProps}
      >
        <Box
          bgcolor="primary.main"
          color="primary.contrastText"
          margin={-0.5}
          p={0.65}
          style={{
            opacity: 0.9,
            maxWidth: '255px',
            fontSize: '.677rem',
          }}
        >
          {popoverChildren}
        </Box>
      </MaterialPopover>
    </>
  );
};

Popover.defaultProps = {
  disablePopover: false,
  PopoverProps: {},
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  disablePopover: PropTypes.bool,
  popoverChildren: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  PopoverProps: PropTypes.object,
};

export default Popover;
