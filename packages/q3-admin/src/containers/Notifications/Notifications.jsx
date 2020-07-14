import React from 'react';
import Notifications from 'q3-ui-notifications';
import { set, invoke } from 'lodash';
import { array } from 'q3-ui-helpers';
import { getSocketInstance } from '../../hooks/useSocket';

const NotificationsContainer = () => {
  const ref = React.useRef();
  const [list, setList] = React.useState([]);

  const dataToListState = ({ data }) =>
    setList((prevState = []) =>
      (array.hasLength(prevState)
        ? [...new Set([].concat(data).concat(prevState))]
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
    invoke(ref, 'current.io.emit', eventName, id, () => {
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
    const io = getSocketInstance();

    io.on('message', dataToListState);

    io.on('connect_error', () => {
      io.close();
    });

    io.on('error', (e) => {
      // eslint-disable-next-line
      console.log(e);
      io.close();
    });

    io.on('connect', () => {
      // prevents it from connecting too often...
      set(ref, 'current.io', io);
    });

    return () => {
      io.close();
    };
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
