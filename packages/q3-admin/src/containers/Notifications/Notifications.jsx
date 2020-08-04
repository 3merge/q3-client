import React from 'react';
import Notifications from 'q3-ui-notifications';
import { array } from 'q3-ui-helpers';
import { SocketContext } from '../Socket';

const NotificationsContainer = () => {
  const [list, setList] = React.useState([]);
  const { emit, on } = React.useContext(SocketContext);

  const dataToListState = ({ data }) =>
    setList((prevState = []) =>
      (array.hasLength(prevState)
        ? [].concat(data).concat(prevState)
        : [data]
      )
        .flat()
        .filter(Boolean)
        .map((item) => ({
          label: item.path,
          ...item,
        })),
    );

  const sendToSocket = (eventName) => (
    eventInstance,
    id,
  ) => {
    emit(eventName, id, () => {
      setList((prev) =>
        prev.map((item) => ({
          ...item,
          ...(item.id === id
            ? {
                'hasDownloaded': true,
                'hasSeen': true,
              }
            : {}),
        })),
      );
    });
  };

  React.useEffect(() => {
    on('download', dataToListState);
    on('recent', dataToListState);
  }, []);

  return (
    <Notifications
      data={list}
      // we'll handle both the same way for now
      onClick={sendToSocket('acknowledge')}
      onView={sendToSocket('acknowledge')}
    />
  );
};

export default React.memo(NotificationsContainer);
