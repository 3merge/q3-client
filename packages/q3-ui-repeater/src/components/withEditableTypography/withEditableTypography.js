import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, get, omit, merge } from 'lodash';
import { object } from 'q3-ui-helpers';
import { Typography } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import useRepeaterDecorator from '../../useRepeaterDecorator';
import Editable from '../Editable';

const withEditableTypography = ({
  data,
  ...sharedProps
}) => {
  const EditableTypographyFormatter = ({
    name,
    editable,
    ...rest
  }) => {
    const { t } = useTranslation('labels');
    const repeater = useRepeaterDecorator(name, editable);
    const defaultPlaceholder = '--';

    if (!repeater) return defaultPlaceholder;

    if (object.isFn(name))
      return React.createElement(
        Typography,
        rest,
        name(data),
      );

    const { edit, isEditable } = repeater;
    const { renderer } = editable;

    const removeFormatters = (args) =>
      omit(args, [
        'toDate',
        'toPrice',
        'trans',
        'toTruthy',
        'collectionName',
      ]);

    const formatText = (value) => {
      let formatted = value;
      const { type, toDate, toPrice, toTruthy, trans } =
        editable;

      if (type === 'number')
        formatted = string.toNumber(
          value,
          defaultPlaceholder,
        );

      if (type === 'checkbox' || toTruthy)
        formatted = string.toTruthy(value, t);

      if (toDate || type === 'date')
        formatted = string.toDate(
          value,
          defaultPlaceholder,
        );

      if (toPrice) formatted = string.toPrice(value);
      if (trans) formatted = t(value);
      if (!formatted) formatted = defaultPlaceholder;
      return formatted;
    };

    const onSubmit = (...params) =>
      edit(data.id)(...params);

    const text = formatText(get(data, name), editable, t);

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

  EditableTypographyFormatter.defaultProps = {
    editable: {},
  };

  EditableTypographyFormatter.propTypes = {
    name: PropTypes.string.isRequired,
    editable: PropTypes.shape({
      renderer: PropTypes.func,
      type: PropTypes.string,
      toDate: PropTypes.bool,
      toPrice: PropTypes.bool,
      toTruthy: PropTypes.bool,
      trans: PropTypes.bool,
    }),
  };

  return EditableTypographyFormatter;
};

export default withEditableTypography;
