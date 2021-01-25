import React from 'react';
import MaterialPopover from '@material-ui/core/Popover';

const Popover = ({
  children,
  popoverChildren,
  PopoverProps = {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        {...PopoverProps}
      >
        {popoverChildren}
      </MaterialPopover>
    </>
  );
};

export default Popover;
