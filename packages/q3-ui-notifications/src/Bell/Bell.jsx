import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export const CustomBadge = withStyles((theme) => ({
  dot: {
    backgroundColor: theme.palette.success.main,
  },
}))(Badge);

export const Bell = React.forwardRef(
  ({ active, isOpen, ...props }, ref) => {
    const { t } = useTranslation('labels');

    return (
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('notifications')}
        ref={ref}
        {...props}
      >
        <CustomBadge
          variant="dot"
          showZero={active}
          badgeContent={0}
        >
          {active ? (
            <NotificationsActiveIcon />
          ) : (
            <NotificationsPausedIcon />
          )}
        </CustomBadge>
      </IconButton>
    );
  },
);

Bell.propTypes = {
  active: PropTypes.bool,
  isOpen: PropTypes.bool,
};

Bell.defaultProps = {
  active: false,
  isOpen: false,
};

export default Bell;
