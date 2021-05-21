import React from 'react';
import { IconButton } from '@material-ui/core';
import { ContactSupport as ContactSupportIcon } from '@material-ui/icons';
import axios from 'axios';
import FreshbooksEmbed from '../FreshbooksEmbed';

const Documentation = (props) => {
  const [jwt, setJwt] = React.useState();
  const [init, setInit] = React.useState();

  const getToken = () =>
    axios.get('/freshbooks').then(({ data }) => {
      return data.token;
    });

  const invokeFreshworksWidget = (...params) => {
    if (window?.FreshworksWidget)
      window.FreshworksWidget(...params);
  };

  const callback = () =>
    getToken().then((token) =>
      invokeFreshworksWidget('authenticate', {
        callback,
        token,
      }),
    );

  const open = () => invokeFreshworksWidget('open');

  React.useEffect(() => {
    const checkForFreshworksWidget = () =>
      setTimeout(() => {
        setInit(true);
        invokeFreshworksWidget('authenticate', {
          token: jwt,
          callback,
        });

        if (!init) {
          checkForFreshworksWidget();
        }
      }, 1500);

    if (!jwt)
      getToken()
        .then(setJwt)
        .catch(() => {
          setInit(true);
        });
    else checkForFreshworksWidget();
  }, [jwt]);

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
