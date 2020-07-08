import React from 'react';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppHeaderPopover from '../../components/AppHeaderPopover';
import { getSocketInstance } from '../../hooks/useSocket';

const Notifications = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const io = getSocketInstance();

    io.on('exports', ({ data }) => {
      setList((prev) => new Set([...prev.concat(data)]));
    });
  }, []);

  return (
    <AppHeaderPopover
      icon={NotificationsActiveIcon}
      //    showBadge={list.some((item) => !item.hasDownloaded)}
    >
      <List style={{ width: 350, maxHeight: 450 }}>
        {list.length ? (
          list.map((item) => (
            <ListItem>
              <ListItemText
                primary={item.path}
                secondary={
                  <a href={item.url} download>
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
