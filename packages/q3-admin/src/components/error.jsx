/* eslint-disable no-param-reassign */
import React from 'react';
import ErrorComponent from 'q3-ui/lib/error';
import ErrorIcon from '../images/error';

export default () => (
  <ErrorComponent title="error" description="error">
    <ErrorIcon />
  </ErrorComponent>
);
