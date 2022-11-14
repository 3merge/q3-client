import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { map } from 'lodash';
import MessageTypes from '../MessageTypes';
import BulkProvider from '../BulkProvider';
import NotificationsList from '../NotificationsList';
import useNotifications from '../useNotifications';
import useNotificationHandlers from '../useNotificationHandlers';
import useStyles from './styles';

const Notifications = ({
  defaultView,
  messageTypes,
  ...rest
}) => {
  const [view, setView] = React.useState(defaultView);
  const {
    bulkArchiveByIds,
    bulkReadByIds,
    bulkRemoveByIds,
    bulkUnarchiveByIds,
    bulkUnreadByIds,
    data,
    fetching,
    fetchingError,
    scrollWatchRef,
    showScrollWatch,
    ...restServices
  } = useNotifications(view);
  const cls = useStyles(rest);

  return (
    <Box className={cls.view}>
      <Tabs
        className="notification-views"
        value={view}
        onChange={(_, newView) => {
          setView(newView);
        }}
      >
        <Tab label="unread" value="unread" />
        <Tab label="all" value="all" />
        <div style={{ flex: 1 }} />
        <Tab label="archived" value="archived" />
      </Tabs>
      <MessageTypes messageTypes={messageTypes}>
        {(messageType) => {
          const filteredData = useNotificationHandlers(
            data,
            restServices,
            messageType,
          );

          return (
            <BulkProvider
              ids={map(filteredData, 'id')}
              bulkArchiveByIds={bulkArchiveByIds}
              bulkReadByIds={bulkReadByIds}
              bulkRemoveByIds={bulkRemoveByIds}
              bulkUnarchiveByIds={bulkUnarchiveByIds}
              bulkUnreadByIds={bulkUnreadByIds}
              messageType={messageType}
              view={view}
            >
              <NotificationsList
                data={filteredData}
                error={fetchingError}
                loading={fetching}
              />
            </BulkProvider>
          );
        }}
      </MessageTypes>
      {showScrollWatch && (
        <Box p={2} ref={scrollWatchRef}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

Notifications.propTypes = {
  defaultView: PropTypes.oneOf([
    'all',
    'archived',
    'latest',
    'unread',
  ]),
  enableBulk: PropTypes.bool,
  enableMessageTypeFiltering: PropTypes.bool,
  enableViews: PropTypes.bool,
  messageTypes: PropTypes.arrayOf(PropTypes.string),
};

Notifications.defaultProps = {
  defaultView: 'unread',
  enableBulk: true,
  enableMessageTypeFiltering: true,
  enableViews: true,
  messageTypes: ['Male', 'Female'],
};

export default Notifications;
