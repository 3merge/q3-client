import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { browser } from 'q3-ui-helpers';
import { Definitions, Dispatcher } from '../context';

const START = 'START';
const REDIRECT = 'REDIRECT';
const ERROR = 'ERROR';

const reducer = (state, action) => {
  switch (action.type) {
    case START:
      return {
        error: false,
        loading: true,
        redirecting: false,
      };
    case REDIRECT:
      return {
        error: false,
        loading: false,
        redirecting: true,
      };
    case ERROR:
      return {
        error: true,
        loading: false,
        redirecting: false,
      };
    default:
      throw new Error('Unknown action type');
  }
};

const useTrash = (timeout = 0) => {
  const {
    collectionName,
    directoryPath,
  } = React.useContext(Definitions);
  const { remove } = React.useContext(Dispatcher);
  const [state, dispatch] = React.useReducer(reducer, {
    error: false,
    loading: false,
    redirecting: false,
  });

  const { canDelete: can } = useAuth(collectionName);
  const fn = remove();

  const handleDispatch = (type) =>
    dispatch({
      type,
    });

  const onClick = () => {
    handleDispatch(START);
    return fn()
      .then(() => {
        handleDispatch(REDIRECT);
        browser.redirectIn(directoryPath, timeout);
      })
      .catch(() => {
        handleDispatch(ERROR);
      });
  };

  return {
    can,
    onClick,
    ...state,
  };
};

export default useTrash;
