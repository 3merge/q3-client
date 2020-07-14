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
  object.isIn(target, 'url');

export const hasActiveNotifications = (items) =>
  array.hasLength(items)
    ? items.some(
        // neither of message nor download that has been reached
        (item) => !item.hasDownloaded && !item.hasSeen,
      )
    : false;

const Notifications = ({
  data,
  defaultValue,
  onView,
  onClick,
}) => {
  const cls = useStyle();
  const { t } = useTranslation();
  const len = array.hasLength(data) > 0;

  return (
    <Popover
      defaultValue={defaultValue}
      anchorComponent={
        <Bell
          active={hasActiveNotifications(data)}
          hasItems={len}
        />
      }
    >
      <List className={cls.root}>
        {len ? (
          data.map((item) => {
            const key = item.id || item.label;

            return item.url ? (
              <NotificationLink
                key={key}
                id={key}
                onClick={onClick}
                {...item}
              />
            ) : (
              <NotificationReadOnly
                key={key}
                id={key}
                onView={onView}
                {...item}
              />
            );
          })
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
  defaultValue: PropTypes.bool,
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
  defaultValue: false,
  onClick: undefined,
  onView: undefined,
};

export default Notifications;
