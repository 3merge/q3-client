import React from 'react';
import { CONNECT, ERROR } from '../constants';
import useChangeEvent from '../useChangeEvent';

const useServerSideEventsConnection = () => {
  const [state, setState] = React.useState({
    connected: false,
    error: false,
  });

  const { attach, detach } = useChangeEvent();

  const updateState = (incomingState) =>
    setState((prevState) => ({
      ...prevState,
      ...incomingState,
    }));

  const handleEvent = (evt) => {
    const { action } = evt.data;
    if (action === CONNECT)
      updateState({
        connected: true,
      });
    if (action === ERROR)
      updateState({
        error: true,
      });
  };

  React.useEffect(() => {
    attach(handleEvent);
    return () => detach(handleEvent);
  }, []);

  return state;
};

export default useServerSideEventsConnection;
