import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { object } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import Bell from '../Bell';
import Popover from '../Popover';
import NotificationLink from '../NotificationLink';
import NotificationReadOnly from '../NotificationReadOnly';
import useCount from '../useCount';
import useStyle from './useStyle';

export const isLink = (target) =>
  object.isIn(target, 'url');

const Notifications = ({
  buttonComponent,
  data,
  defaultValue,
  error,
  onView,
  onClick,
}) => {
  const cls = useStyle();
  const { t } = useTranslation();
  const count = useCount(data);

  const buttonComponentProps = {
    ...count,
    error,
  };

  const icon = React.useCallback(
    () => React.createElement(Bell, buttonComponentProps),
    [buttonComponentProps],
  );

  return (
    <Popover
      defaultValue={defaultValue}
      anchorComponent={buttonComponent({
        icon,
        ...buttonComponentProps,
      })}
    >
      <List className={cls.root}>
        {count.hasItems ? (
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
  buttonComponent: PropTypes.func.isRequired,
  defaultValue: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      hasBeenDownloaded: PropTypes.bool,
      hasSeen: PropTypes.bool,
    }),
  ),
  error: PropTypes.bool,
  onClick: PropTypes.func,
  onView: PropTypes.func,
};

Notifications.defaultProps = {
  data: [],
  defaultValue: false,
  error: false,
  onClick: undefined,
  onView: undefined,
};

export default Notifications;
