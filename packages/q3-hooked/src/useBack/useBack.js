import React from 'react';
import { Link, navigate, useLocation } from '@reach/router';
import { Definitions } from '../context';

export default () => {
  const {
    directoryPath = '/',
    resourceName,
  } = React.useContext(Definitions);
  const router = useLocation();
  const state = {};

  let to = router?.state?.prev;

  if (typeof to === 'string' && !to.includes(resourceName))
    to = undefined;

  to ||= directoryPath;

  return {
    onClick: () =>
      navigate(to, {
        state,
      }),

    renderer: (props) =>
      React.createElement(Link, {
        ...props,
        state,
        to,
      }),
  };
};
