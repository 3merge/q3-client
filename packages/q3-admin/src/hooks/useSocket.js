import React from 'react';
import { get } from 'lodash';
import axios from 'axios';
import socket from 'socket.io-client';

export default (collectionName, id) => {
  const url = new URL(
    get(axios, 'defaults.baseURL', 'http://localhost'),
  );

  url.port = '8080';

  const [lastUpdated, setLastUpdated] = React.useState();
  const io = socket(url.toString());

  React.useEffect(() => {
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

  return { io, lastUpdated };
};
