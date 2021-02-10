import React from 'react';
import { get } from 'lodash';
import { object, string } from 'q3-ui-helpers';
import Typography from '@material-ui/core/Typography';
import { EditableTypography } from 'q3-components';
import { useTranslation } from 'react-i18next';
import useRepeaterDecorator from '../../useRepeaterDecorator';

export default ({ data, ...sharedProps }) => ({
  name,
  editable,
  ...rest
}) => {
  const { t } = useTranslation();
  const repeater = useRepeaterDecorator(name, editable);

  if (!repeater) return '--';

  if (object.isFn(name))
    return React.createElement(
      Typography,
      rest,
      name(data),
    );

  const { edit, isEditable, prefix } = repeater;

  const value = get(data, name);
  let formatted = value;

  if (editable.toString) formatted = String(value);
  if (editable.toTruthy)
    formatted = string.toTruthy(value, t);
  if (editable.toDate) formatted = string.toDate(value);
  if (editable.toPrice) formatted = string.toPrice(value);
  if (editable.trans) formatted = t(value);
  if (!formatted) formatted = '--';

  return React.createElement(
    EditableTypography,
    {
      ...editable,
      isEditable,
      renderer: editable.renderer,
      initialValues: data,
      fieldProps: {
        name: prefix,
        style: {
          fontSize: '0.833rem',
          fontWeight: 'bold',
          lineHeight: 1,
        },
        ...editable,
      },
      onSubmit: (...params) => edit(data.id)(...params),
      ...sharedProps,
      ...rest,
    },
    formatted,
  );
};
