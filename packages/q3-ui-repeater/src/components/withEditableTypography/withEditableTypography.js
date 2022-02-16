import React from 'react';
import { isFunction, get, omit, merge } from 'lodash';
import { object } from 'q3-ui-helpers';
import { Typography } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import useRepeaterDecorator from '../../useRepeaterDecorator';
import Editable from '../Editable';

const defaultPlaceholder = '--';

const removeFormatters = (args) =>
  omit(args, [
    'toDate',
    'toPrice',
    'trans',
    'toTruthy',
    'collectionName',
  ]);

const formatText = (value, args, t) => {
  let formatted = value;

  if (args.type === 'number')
    formatted = string.toNumber(value, defaultPlaceholder);

  if (args.type === 'checkbox' || args.toTruthy)
    formatted = string.toTruthy(value, t);

  if (args.toDate || args.type === 'date')
    formatted = string.toDate(value, defaultPlaceholder);

  if (args.toPrice) formatted = string.toPrice(value);
  if (args.trans) formatted = t(value);
  if (!formatted) formatted = defaultPlaceholder;

  return formatted;
};

export default ({ data, ...sharedProps }) =>
  ({ name, editable, ...rest }) => {
    const repeater = useRepeaterDecorator(name, editable);

    if (!repeater) return '--';

    if (object.isFn(name))
      return React.createElement(
        Typography,
        rest,
        name(data),
      );

    const { edit, isEditable } = repeater;
    const { renderer } = editable;

    const text = formatText(get(data, name), editable);

    const onSubmit = (...params) =>
      edit(data.id)(...params);

    if (isFunction(renderer))
      return renderer(data, onSubmit);

    return isEditable
      ? React.createElement(Editable, {
          ...removeFormatters(
            merge({}, sharedProps, rest, editable),
          ),
          initialValues: data,
          name,
          onSubmit,
          text,
        })
      : text;
  };
