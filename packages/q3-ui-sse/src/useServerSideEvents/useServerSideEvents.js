import React from 'react';
import axios from 'axios';
import { AuthContext } from 'q3-ui-permissions';
import { get } from 'lodash';
import { CHANGE, CONNECT, ERROR } from '../constants';
import useChangeEvent from '../useChangeEvent';

const useServerSideEvents = (Source = EventSource) => {
  const state = React.useContext(AuthContext)?.state;
  const { dispatch } = useChangeEvent();
  const url = axios?.defaults?.baseURL;
  const init = get(state, 'init', false);
  const userId = get(state, 'profile.id', null);

  const connectionString = [
    String(url).endsWith('/') ? url : `${url}/`,
    'stream',
  ].join('');

  React.useEffect(() => {
    // can't run without these defined upstream
    if (!connectionString || !init) return null;

    const eventSource = new Source(
      `${connectionString}?userId=${userId}`,
    );

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
  }, [connectionString, init, userId]);
};

export default useServerSideEvents;
