import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from 'q3-ui/lib/tooltip';
import Badge from '@material-ui/core/Badge';
import Dialog from 'q3-ui-dialog';
import useStyles from '../../utils/useStyles';

const StickyPopover = ({
  children,
  icon: Icon,
  label,
  count,
}) => {
  const { trigger } = useStyles();

  return (
    <Box mb={0.25} mr={0.25}>
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
              <Fab
                onClick={open}
                size="large"
                className={trigger}
              >
                {isOpen ? <Close /> : <Icon />}
              </Fab>
            </Badge>
          </Tooltip>
        )}
      />
    </Box>
  );
};

StickyPopover.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
};

StickyPopover.defaultProps = {
  count: 0,
};

export default StickyPopover;
