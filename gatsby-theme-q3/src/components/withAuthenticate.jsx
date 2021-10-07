import React from 'react';
import { useLocation } from '@reach/router';
import useSiteMetaData from './useSiteMetaData';
import { authenticate } from './utils';

export default (Component) => (props) => {
  const { appDirectory } = useSiteMetaData();

  const redirectionPath =
    useLocation()?.state?.gatekeeper || appDirectory;

  return (
    <Component
      {...props}
      authenticate={(formValues) =>
        authenticate(formValues, redirectionPath)
      }
    />
  );
};
