/* eslint-disable no-param-reassign */
import React from 'react';
import ErrorComponent from 'q3-ui/lib/error';
import EmptyIcon from '../images/empty';

export default () => (
  <ErrorComponent title="empty" description="empty">
    <EmptyIcon />
  </ErrorComponent>
);
