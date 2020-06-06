import React from 'react';
import { array } from 'q3-ui-helpers';

export default (Component, propName) => (props) =>
  array.hasLength(props[propName]) ? (
    <Component {...props} />
  ) : null;
