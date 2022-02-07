import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
} from '@material-ui/core';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'q3-ui-locale';
import useStyles from './styles';

export const CustomBadge = withStyles((theme) => ({
  dot: {
    backgroundColor: theme.palette.success.main,
  },
}))(Badge);

export const Bell = React.forwardRef(
  (
    {
      active,
      error,
      numberOfNotifications,
      isOpen,
      hasItems,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation('labels');
    const cls = useStyles({
      hasItems,
    });

    const renderIcon = () => {
      if (error) return <NotificationsOffIcon />;
      if (active) return <NotificationsActiveIcon />;
      return <NotificationsPausedIcon />;
    };

    return (
      <ListItem
        button
        dense
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('notifications')}
        ref={ref}
        {...props}
      >
        <ListItemAvatar>
          <Badge badgeContent={numberOfNotifications}>
            <Avatar
              className={cls.avatar}
              variant="rounded"
            >
              {renderIcon()}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={t('labels:notifications')}
          secondary={t('helpers:notifications')}
        />
      </ListItem>
    );
  },
);

Bell.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.bool,
  isOpen: PropTypes.bool,
  numberOfNotifications: PropTypes.number,
  hasItems: PropTypes.bool,
};

Bell.defaultProps = {
  active: false,
  error: false,
  isOpen: false,
  numberOfNotifications: false,
  hasItems: false,
};

export default Bell;
