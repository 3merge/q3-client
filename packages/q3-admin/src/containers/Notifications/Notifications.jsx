import React from 'react';
import Notifications from 'q3-ui-notifications';
import { array } from 'q3-ui-helpers';
import { getSocketInstance } from '../../hooks/useSocket';

const NotificationsContainer = () => {
  const [list, setList] = React.useState([]);
  const io = getSocketInstance();

  const dataToListState = ({ data }) =>
    setList((prevState = []) =>
      array.hasLength(prevState)
        ? [...new Set(prevState.concat(data))]
        : [data],
    );

  const sendToSocket = (eventName) => (eventInstance, id) =>
    io.emit(eventName, id);

  React.useEffect(() => {
    io.on('message', dataToListState);
    io.on('download', dataToListState);

    io.on('connect_error', () => {
      io.close();
    });

    return () => {
      io.close();
    };
  }, []);

  return (
    <Notifications
      data={list}
      onClick={sendToSocket('downloaded')}
      onView={sendToSocket('read')}
    />
  );
};

export default NotificationsContainer;
