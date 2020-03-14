import React from 'react';
import { get, invoke } from 'lodash';

export default (Component, { key }) => (props) => (
  <Component
    {...props}
    id={get(props, `state.${key}.id`)}
    onSubmit={invoke(props, 'state.patch')}
    data={get(props, `state.${key}`, {})}
  />
);
