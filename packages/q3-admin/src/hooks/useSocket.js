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

  return socket(url.toString());
};
