import React from 'react';
import { useLocation } from '@reach/router';
import useAppDirectory from './useAppDirectory';
import { authenticate } from './utils';

export default (Component) => (props) => {
  const dir = useAppDirectory();

  const redirectionPath =
    useLocation()?.state?.gatekeeper || dir;

  return (
    <Component
      {...props}
      authenticate={(formValues) =>
        authenticate(formValues, redirectionPath)
      }
    />
  );
};
