import React from 'react';
import CheckBox from './checkBox';

export default (props) =>
  React.createElement(CheckBox, {
    op: '!*',
    ...props,
  });
