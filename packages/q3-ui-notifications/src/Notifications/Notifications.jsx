import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NotificationsList from '../NotificationsList';
import useNotifications from '../useNotifications';

const Notifications = ({ defaultView }) => {
  const {
    data,
    fetching,
    fetchingError,
    scrollWatchRef,
    showScrollWatch,
  } = useNotifications(defaultView);

  console.log(data);

  return (
    <>
      {defaultView !== 'latest' && (
        <Tabs value="unread">
          <Tab label="unread" value="unread" />
          <Tab label="all" value="all" />
          <Tab label="archived" value="archived" />
        </Tabs>
      )}
      <NotificationsList
        data={data}
        error={fetchingError}
        loading={fetching}
      />
      {showScrollWatch && (
        <div ref={scrollWatchRef}>SHOW MORE</div>
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
