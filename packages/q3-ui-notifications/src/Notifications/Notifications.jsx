import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { map } from 'lodash';
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
  } = useNotifications(view);

  return (
    <>
      <div>
        <div>
          Mark all as read
          <br />
          Archive everything
        </div>
        FILTER
      </div>
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
      <div>
        Mark as read
        <br /> Mark as unread
        <br />
        Archive
        <br />
        Rtore
        <br />
        Delete
      </div>
      <NotificationsList
        data={map(data, (item) => ({
          ...item,
          updateToRead: () => updateToRead(item.id),
          updateToArchived: () => updateToArchived(item.id),
        }))}
        error={fetchingError}
        loading={fetching}
      />
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
