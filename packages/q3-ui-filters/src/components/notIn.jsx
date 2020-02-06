import React from 'react';
import MultiSelect from './multiSelect';

export default (props) =>
  React.createElement(MultiSelect, {
    op: '![]',
    ...props,
  });
