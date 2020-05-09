import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from 'q3-ui/lib/tooltip';
import Badge from '@material-ui/core/Badge';
import Dialog from 'q3-ui-dialog';

const StickyPopover = ({
  children,
  icon: Icon,
  label,
  count,
  ...rest
}) => (
  <Box {...rest} p="12px">
    <Dialog
      title={label}
      renderContent={() => children}
      renderTrigger={(open, isOpen) => (
        <Tooltip
          arrow
          title={label}
          placement="bottom-start"
        >
          <Badge
            color="secondary"
            badgeContent={count}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <IconButton onClick={open} size="small">
              {isOpen ? <Close /> : <Icon />}
            </IconButton>
          </Badge>
        </Tooltip>
      )}
    />
  </Box>
);

StickyPopover.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
};

StickyPopover.defaultProps = {
  count: 0,
};

export default StickyPopover;
