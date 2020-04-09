import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import Tooltip from 'q3-ui/lib/tooltip';
import Badge from '@material-ui/core/Badge';
import { useToggle } from 'useful-state';
import useStyles from '../../utils/useStyles';

const StickyPopover = ({
  id,
  children,
  icon: Icon,
  label,
  count,
}) => {
  const anchorEl = React.useRef();
  const { trigger } = useStyles();

  const {
    toggle,
    state: isOpen,
    close: onClose,
  } = useToggle();

  return (
    <Box mb={0.25} mr={0.25}>
      <Tooltip arrow title={label} placement="bottom-start">
        <Badge
          color="secondary"
          badgeContent={count}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Fab
            onClick={toggle}
            ref={anchorEl}
            size="large"
            className={trigger}
          >
            {isOpen ? <Close /> : <Icon />}
          </Fab>
        </Badge>
      </Tooltip>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={onClose}
        disableRestoreFocus
        PaperProps={{
          elevation: 20,
        }}
      >
        <Box
          p={2}
          width="375px"
          maxWidth="100%"
          height={375}
          style={{
            overflowY: 'scroll',
          }}
        >
          {children}
        </Box>
      </Popover>
    </Box>
  );
};

StickyPopover.propTypes = {};

StickyPopover.defaultProps = {
  renderAside: null,
};

export default StickyPopover;
