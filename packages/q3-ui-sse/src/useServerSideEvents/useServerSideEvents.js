import React from 'react';
import axios from 'axios';
import { CHANGE, CONNECT, ERROR } from '../constants';
import useChangeEvent from '../useChangeEvent';

const useServerSideEvents = (Source = EventSource) => {
  const { dispatch } = useChangeEvent();
  const url = axios?.defaults?.baseURL;

  const connectionString = [
    String(url).endsWith('/') ? url : `${url}/`,
    'stream',
  ].join('');

  React.useEffect(() => {
    const eventSource = new Source(connectionString);

    eventSource.onerror = () =>
      dispatch({
        action: ERROR,
      });

    eventSource.onmessage = (e) =>
      dispatch({
        ...JSON.parse(e.data),
        action: CHANGE,
      });

    eventSource.onopen = () =>
      dispatch({
        action: CONNECT,
      });

    return () => {
      eventSource.close();
    };
  }, [connectionString]);
};

export default useServerSideEvents;
