import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { reduce } from 'lodash';
import saveAs from 'file-saver';
import { useNavigate } from '@reach/router';
import BulkProvider from '../BulkProvider';
import NotificationsList from '../NotificationsList';
import useNotifications from '../useNotifications';

const Notifications = ({ defaultView }) => {
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
  const [messageType, setMessageType] = React.useState();

  const handleMessageTypeChange = (newState) => () =>
    setMessageType(newState);
  const isSelected = (state) =>
    messageType === state ? 'secondary' : undefined;

  return (
    <>
      {defaultView !== 'latest' && (
        <Tabs
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
      )}
      <Box mt={1}>
        <Chip
          onClick={handleMessageTypeChange()}
          color={isSelected()}
          label="all"
        />
        <Chip
          color={isSelected('Male')}
          onClick={handleMessageTypeChange('Male')}
          label="Male"
        />
        <Chip
          color={isSelected('Female')}
          onClick={handleMessageTypeChange('Female')}
          label="Female"
        />
      </Box>
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
      {showScrollWatch && (
        <Box p={2} ref={scrollWatchRef}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

Notifications.propTypes = {
  defaultView: PropTypes.oneOf([
    'all',
    'archived',
    'latest',
    'unread',
  ]),
};

Notifications.defaultProps = {
  defaultView: 'unread',
};

export default Notifications;
