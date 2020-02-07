import React from 'react';
import TextField from './textField';
import CheckBox from './checkBox';
import MultiSelect from './multiSelect';

const asTextField = (op) => (props) =>
  React.createElement(TextField, {
    ...props,
    op,
  });

const asCheckbox = (op) => (props) =>
  React.createElement(CheckBox, {
    ...props,
    op,
  });

const asMultiSelect = (op) => (props) =>
  React.createElement(MultiSelect, {
    ...props,
    op,
  });

export const DoesNotEqual = asTextField('!=');
export const Equals = asTextField('=');
export const GreaterThanOrEqualTo = asTextField('>=');
export const LessThanOrEqualTo = asTextField('<=');
export const DoesNotExist = asCheckbox('!*');
export const Exists = asCheckbox('*');
export const In = asMultiSelect('[]');
export const NotIn = asMultiSelect('![]');
