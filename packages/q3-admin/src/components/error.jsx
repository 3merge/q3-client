/* eslint-disable no-param-reassign */
import React from 'react';
import ErrorComponent from 'q3-ui/lib/error';
import { Error as ErrorIcon } from 'q3-ui-assets';

export default () => (
  <ErrorComponent title="error" description="error">
    <ErrorIcon />
  </ErrorComponent>
);
