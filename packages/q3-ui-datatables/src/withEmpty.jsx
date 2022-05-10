/* eslint-disable no-param-reassign */
import React from 'react';
import Graphic from 'q3-ui-assets';
import { withLocation } from 'with-location';

const Empty = withLocation(({ children }) => (
  <>
    {children}
    <Graphic icon="Empty" title="empty" />
  </>
));

export default (Component) => (props) =>
  !props.data || !props.data.length ? (
    <Empty {...props} />
  ) : (
    <Component {...props} />
  );
