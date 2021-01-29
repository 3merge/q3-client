import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { red } from '@material-ui/core/colors';

export const CustomBadge = withStyles((theme) => ({
  dot: {
    backgroundColor: theme.palette.success.main,
  },
}))(Badge);

export const Bell = React.forwardRef(
  ({ active, error, hasItems, isOpen, ...props }, ref) => {
    const { t } = useTranslation('labels');

    const renderIcon = () => {
      if (error)
        return (
          <NotificationsOffIcon
            style={{ color: red[900] }}
          />
        );
      if (active) return <NotificationsActiveIcon />;
      if (hasItems) return <NotificationsIcon />;

      return <NotificationsPausedIcon />;
    };

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
          showZero={active && !error}
          badgeContent={0}
        >
          {renderIcon()}
        </CustomBadge>
      </IconButton>
    );
  },
);

Bell.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.bool,
  isOpen: PropTypes.bool,
  hasItems: PropTypes.bool,
};

Bell.defaultProps = {
  active: false,
  error: false,
  isOpen: false,
  hasItems: false,
};

export default Bell;
