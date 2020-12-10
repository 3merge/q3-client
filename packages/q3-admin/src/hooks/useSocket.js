import React from 'react';
import { get } from 'lodash';
import axios from 'axios';
import socket from 'socket.io-client';
import Headers from 'q3-ui-permissions/lib/utils/header';

export const getSocketInstance = () => {
  const url = new URL(
    // socket.io lives on the same REST server
    // so we can use axios' config to get the URI
    get(axios, 'defaults.baseURL', 'http://localhost'),
  );

  url.search = Object.entries(new Headers().tokens)
    .reduce((acc, [key, value]) => {
      return acc.concat(`${key}=${value}`);
    }, [])
    .join('&');

  return socket(url.toString(), {
    forceNew: false,
    autoConnect: false,
    reconnection: false,
  });
};

export default (collectionName, id) => {
  const [lastUpdated, setLastUpdated] = React.useState();

  React.useEffect(() => {
    const io = getSocketInstance();
    const pollOnChange = (d) => {
      if (
        // must match both the collection name and/or document ID
        d.collectionName === collectionName &&
        (id === d.id || !id)
      )
        setLastUpdated(get(d, 'updatedAt', new Date()));
    };

    io.on('insert', pollOnChange);
    io.on('update', pollOnChange);

    io.on('connect_error', () => {
      io.close();
    });

    return () => {
      io.close();
    };
  }, []);

  return lastUpdated;
};
