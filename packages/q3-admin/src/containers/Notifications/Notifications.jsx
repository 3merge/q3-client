import React from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppHeaderPopover from '../../components/AppHeaderPopover';
import { useExportSource } from '../../hooks';

const Notifications = ({ socket }) => {
  const { list, fetching, markAsSeen } = useExportSource(
    socket,
  );

  return (
    <AppHeaderPopover
      disabled={fetching}
      icon={NotificationsActiveIcon}
      showBadge={list.some((item) => !item.hasDownloaded)}
    >
      <List style={{ width: 350, maxHeight: 450 }}>
        {list.length ? (
          list.map((item) => (
            <ListItem>
              <ListItemText
                primary={item.path}
                secondary={
                  <a
                    href={item.url}
                    download
                    onClick={() => markAsSeen(item._id)}
                  >
                    Download Export
                  </a>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="No recent exports"
              secondary="This list will show all seen and unseen exports from the last 24 hour period."
            />
          </ListItem>
        )}
      </List>
    </AppHeaderPopover>
  );
};

export default Notifications;
