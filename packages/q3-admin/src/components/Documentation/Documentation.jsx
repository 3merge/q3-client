import React from 'react';
import { isFunction } from 'lodash';
import { IconButton } from '@material-ui/core';
import { ContactSupport as ContactSupportIcon } from '@material-ui/icons';
import axios from 'axios';
import FreshbooksEmbed from '../FreshbooksEmbed';

const Documentation = (props) => {
  const [jwt, setJwt] = React.useState();
  const [init, setInit] = React.useState();

  const hasFreshbooks = () =>
    isFunction(window?.FreshworksWidget);

  const getToken = () =>
    axios.get('/documentation').then(({ data }) => {
      return data.token;
    });

  const invokeFreshworksWidget = (...params) => {
    if (hasFreshbooks()) {
      window.FreshworksWidget(...params);
    }
  };

  const callback = () =>
    getToken().then((token) =>
      invokeFreshworksWidget('authenticate', {
        callback,
        token,
      }),
    );

  const open = () => {
    invokeFreshworksWidget('open');
  };

  React.useEffect(() => {
    let timer;

    const endTimer = () => {
      if (timer) clearInterval(timer);
    };

    timer = setInterval(() => {
      if (jwt && hasFreshbooks()) {
        invokeFreshworksWidget('authenticate', {
          token: jwt,
          callback,
        });

        endTimer();
        setInit(true);
      }
    }, 1500);

    if (!jwt)
      getToken()
        .then(setJwt)
        .catch(() => {
          setInit(true);
        });

    return endTimer;
  }, [jwt, init]);

  return (
    <>
      <FreshbooksEmbed {...props} />
      {init && (
        <IconButton
          aria-label="documentation"
          color="inherit"
          onClick={open}
        >
          <ContactSupportIcon />
        </IconButton>
      )}
    </>
  );
};

export default Documentation;
