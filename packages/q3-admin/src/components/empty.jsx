/* eslint-disable no-param-reassign */
import React from 'react';
import ErrorComponent from 'q3-ui/lib/error';
import { Empty as EmptyIcon } from 'q3-ui-assets';

export default () => (
  <ErrorComponent title="empty" description="empty">
    <EmptyIcon />
  </ErrorComponent>
);
