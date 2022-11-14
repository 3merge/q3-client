import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { reduce } from 'lodash';
import saveAs from 'file-saver';
import { useNavigate } from '@reach/router';
import MessageTypes from '../MessageTypes';
import BulkProvider from '../BulkProvider';
import NotificationsList from '../NotificationsList';
import useNotifications from '../useNotifications';
import useStyles from './styles';

const Notifications = ({ defaultView, ...rest }) => {
  const [view, setView] = React.useState(defaultView);
  const {
    data,
    fetching,
    fetchingError,
    scrollWatchRef,
    showScrollWatch,
    updateToRead,
    updateToArchived,
    bulkArchiveByIds,
    bulkReadByIds,
    bulkRemoveByIds,
    bulkUnarchiveByIds,
    bulkUnreadByIds,
  } = useNotifications(view);
  const navigate = useNavigate();
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
      <MessageTypes>
        {(messageType) => (
          <BulkProvider
            bulkArchiveByIds={bulkArchiveByIds}
            bulkReadByIds={bulkReadByIds}
            bulkRemoveByIds={bulkRemoveByIds}
            bulkUnarchiveByIds={bulkUnarchiveByIds}
            bulkUnreadByIds={bulkUnreadByIds}
            messageType={messageType}
            view={view}
          >
            <NotificationsList
              data={reduce(
                data,
                (acc, curr) => {
                  if (
                    !messageType ||
                    messageType === curr.messageType
                  )
                    acc.push({
                      ...curr,
                      updateToRead: () =>
                        updateToRead(curr.id).then(() => {
                          if (curr.url) saveAs(curr.url);
                          else if (curr.localUrl)
                            navigate(curr.localUrl);
                        }),
                      updateToArchived: () =>
                        updateToArchived(curr.id),
                    });

                  return acc;
                },
                [],
              )}
              error={fetchingError}
              loading={fetching}
            />
          </BulkProvider>
        )}
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
};

Notifications.defaultProps = {
  defaultView: 'unread',
  enableBulk: true,
  enableMessageTypeFiltering: true,
  enableViews: true,
};

export default Notifications;
