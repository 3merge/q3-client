import React from 'react';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/More';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  icon: {
    color: '#DDD',
    fontSize: '13px',
    transition: 'color 250ms',
  },
  text: {
    cursor: 'help',
    fontSize: 'inherit',
    '&:hover': {
      '& svg': {
        color: '#CCC',
      },
    },
  },
}));

export default function MouseOverPopover({
  id = 'mouse-over-popover',
  label,
  helperText,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (
    !label ||
    label === undefined ||
    label === 'undefined'
  )
    return null;

  return (
    <div>
      <Typography
        aria-owns={open ? id : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.text}
      >
        {label} <MoreIcon className={classes.icon} />
      </Typography>
      <Popover
        id={id}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
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
        disableScrollLock
      >
        <Box
          maxWidth="230px"
          component={
            typeof helperText === 'string' ? 'p' : 'div'
          }
        >
          {helperText}
        </Box>
      </Popover>
    </div>
  );
}
