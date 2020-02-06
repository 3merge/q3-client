import React from 'react';
import TextField from './textField';

export default (props) =>
  React.createElement(TextField, {
    op: '<=',
    ...props,
  });
