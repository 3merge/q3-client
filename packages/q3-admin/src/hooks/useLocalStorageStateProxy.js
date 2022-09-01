import React from 'react';
import { browser } from 'q3-ui-helpers';

const useLocalStorageStateProxy = (
  itemKey,
  defaultState,
) => {
  const [state, setState] = React.useState(
    browser.proxyLocalStorageApi('getItem', itemKey) ||
      defaultState,
  );

  const changeState = (nextState) => {
    browser.proxyLocalStorageApi(
      'setItem',
      itemKey,
      nextState,
    );

    setState(nextState);
  };

  return [state, changeState];
};

export default useLocalStorageStateProxy;
