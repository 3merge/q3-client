import React from 'react';
import { size } from 'lodash';
import AlertNoFiles from '../AlertNoFiles';

const withAlertNoFiles = (Component) => {
  const CountFiles = (props) => {
    // eslint-disable-next-line
    const { files, siblings } = props;

    return !size(files) && !size(siblings) ? (
      <AlertNoFiles />
    ) : (
      <Component {...props} />
    );
  };

  return CountFiles;
};

export default withAlertNoFiles;
