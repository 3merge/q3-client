import React from 'react';
import { getSocketInstance } from '../../hooks/useSocket';

export const SocketContext = React.createContext();

const Socket = ({ children }) => {
  const io = getSocketInstance();

  React.useEffect(() => {
    return () => {
      io.close();
    };
  });

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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default Socket;
