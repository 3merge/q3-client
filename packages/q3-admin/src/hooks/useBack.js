import React from 'react';
import { useNavigate } from '@reach/router';
import { browser } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';

export default () => {
  const navigate = useNavigate();
  const { directoryPath = '/' } = React.useContext(
    Definitions,
  );

  const path = browser.proxySessionStorageApi(
    'getItem',
    'prevState',
  );

  return () =>
    navigate(
      String(path).includes(directoryPath)
        ? path
        : directoryPath,
    );
};
