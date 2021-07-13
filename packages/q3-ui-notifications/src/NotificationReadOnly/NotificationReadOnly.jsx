import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { useCreatedAtTitle } from '../NotificationLink/NotificationLink';
import useSeen from '../useSeen';

const NotificationReadOnly = ({
  id,
  label,
  hasSeen,
  onView,
  ...rest
}) => {
  const ref = useSeen(
    {
      id,
      hasSeen,
    },
    onView,
  );

  return (
    <ListItem ref={ref} selected={!hasSeen}>
      <ListItemIcon>
        <AnnouncementIcon />
      </ListItemIcon>
      <ListItemText
        primary={useCreatedAtTitle(rest)}
        secondary={label}
      />
    </ListItem>
  );
};

NotificationReadOnly.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hasSeen: PropTypes.bool,
  onView: PropTypes.func,
};

NotificationReadOnly.defaultProps = {
  hasSeen: false,
  onView: undefined,
};

export default NotificationReadOnly;
