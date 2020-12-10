import React from 'react';
import { getSocketInstance } from '../../hooks/useSocket';

export const SocketContext = React.createContext();

const Socket = ({ children, onDownload }) => {
  const io = getSocketInstance();

  React.useEffect(() => {
    io.connect();
    io.on('download', onDownload);
    io.on('connect_error', () => {
      io.close();
    });

    io.on('error', (e) => {
      // eslint-disable-next-line
      console.log(e);
      io.close();
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        broadcast(data) {
          io.emit('change', data);
        },

        join(data, onMessage) {
          io.emit('join', data).on(
            'modify',
            (forCallback) => {
              if (onMessage) onMessage(forCallback);
            },
          );
        },

        leave(data) {
          io.emit('leave', data);
        },

        watch(onWatch) {
          io.on('refresh', onWatch);
        },

        on: io.on.bind(io),
        emit: io.emit.bind(io),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default Socket;
