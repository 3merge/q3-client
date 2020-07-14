import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { array, object } from 'q3-ui-helpers';
import { useTranslation } from 'react-i18next';
import Bell from '../Bell';
import Popover from '../Popover';
import NotificationLink from '../NotificationLink';
import NotificationReadOnly from '../NotificationReadOnly';
import useStyle from './useStyle';

export const isLink = (target) =>
  object.isIn(target, 'hasBeenDownloaded');

export const hasActiveNotifications = (items) =>
  array.hasLength(items)
    ? items.some(
        (item) =>
          !item.hasSeen ||
          (isLink(item) && !item.hasBeenDownloaded),
      )
    : false;

const Notifications = ({ data, onView, onClick }) => {
  const cls = useStyle();
  const { t } = useTranslation();

  return (
    <Popover
      anchorComponent={
        <Bell active={hasActiveNotifications(data)} />
      }
    >
      <List className={cls.root}>
        {array.hasLength(data) > 0 ? (
          data.map((item) =>
            isLink(item) ? (
              <NotificationLink
                key={item.label}
                onClick={onClick}
                {...item}
              />
            ) : (
              <NotificationReadOnly
                key={item.label}
                onView={onView}
                {...item}
              />
            ),
          )
        ) : (
          <ListItem>
            <ListItemText
              primary={t('titles:noActivity')}
              secondary={t('descriptions:noActivity')}
            />
          </ListItem>
        )}
      </List>
    </Popover>
  );
};

Notifications.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      hasBeenDownloaded: PropTypes.bool,
      hasSeen: PropTypes.bool,
    }),
  ),
  onClick: PropTypes.func,
  onView: PropTypes.func,
};

Notifications.defaultProps = {
  data: [],
  onClick: undefined,
  onView: undefined,
};

export default Notifications;
